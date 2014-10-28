
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Data;
using System.Net;
using System.Text;
using System.Web.Mvc;
using System.Xml;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Collections.Generic;
using System.Reflection;

#if polyfill
using OSGeo.GDAL;
using OSGeo.OGR;
using OSGeo.OSR;
#endif

namespace Allegro.Controllers
{
  public class AllegroController : Controller
  {

    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult Proxy()
    {

      var request = Server.UrlDecode(Request.QueryString["url"]);

      //return Content(request);
      //If IE, unzip, convert to GeoJSON, zip and send back down the line.
      
      if (request.ToUpper().IndexOf("HTTP") != -1)
      {

        var webRequest = HttpWebRequest.Create(request) as HttpWebRequest;

        // Important! Keeps the request from blocking after the first time!
        webRequest.KeepAlive = false;
        webRequest.Credentials = CredentialCache.DefaultCredentials;
        using (var backendResponse = (HttpWebResponse) webRequest.GetResponse())
        {
          var receiveStream = backendResponse.GetResponseStream();

          // Clear whatever is already sent
          Response.Clear();
          Response.ClearContent();
          Response.ClearHeaders();

          // Copy headers
          // Check if header contains a contenth-lenght since IE
          // goes bananas if this is missing
          var contentLengthFound = false;
          foreach (string header in backendResponse.Headers)
          {
            if (string.Compare(header, "CONTENT-LENGTH", true) == 0)
            {
              contentLengthFound = true;
            }
            Response.AppendHeader(header, backendResponse.Headers[header]);
          }
          // Copy content           
          var buff = new byte[1024];
          long length = 0;
          int bytes;
          while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
          {
            length += bytes;
            Response.OutputStream.Write(buff, 0, bytes);
          }

          // Manually add content-lenght header to satisfy IE
          if (!contentLengthFound)
          {
            Response.AppendHeader("Content-Length",
              length.ToString());
          }

          Response.AppendHeader("ContentType", "application/x-zip-compressed");
          Response.AppendHeader("Content-Disposition",
            "attachment; filename=" + backendResponse.ResponseUri.LocalPath.Split('/').Last());

          receiveStream.Close();
          backendResponse.Close();
          Response.Flush();
          Response.Close();
        }
      }
      else //FTP
      {
        var webRequest = FtpWebRequest.Create(request) as FtpWebRequest;

        // Important! Keeps the request from blocking after the first time!
        webRequest.KeepAlive = false;
        //webRequest.Credentials = CredentialCache.DefaultCredentials;
        using (var backendResponse = (FtpWebResponse) webRequest.GetResponse())
        {
          var receiveStream = backendResponse.GetResponseStream();

          // Clear whatever is already sent
          Response.Clear();
          Response.ClearContent();
          Response.ClearHeaders();

          // Copy headers
          // Check if header contains a contenth-lenght since IE
          // goes bananas if this is missing
          var contentLengthFound = false;
          foreach (string header in backendResponse.Headers)
          {
            if (string.Compare(header, "CONTENT-LENGTH", true) == 0)
            {
              contentLengthFound = true;
            }
            Response.AppendHeader(header, backendResponse.Headers[header]);
          }
          // Copy content           
          var buff = new byte[1024];
          long length = 0;
          int bytes;
          while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
          {
            length += bytes;
            Response.OutputStream.Write(buff, 0, bytes);
          }

          // Manually add content-lenght header to satisfy IE
          if (!contentLengthFound)
          {
            Response.AppendHeader("Content-Length",
              length.ToString());
          }

          Response.AppendHeader("ContentType", "application/x-zip-compressed");
          Response.AppendHeader("Content-Disposition",
            "attachment; filename=" + backendResponse.ResponseUri.LocalPath.Split('/').Last());

          receiveStream.Close();
          backendResponse.Close();
          Response.Flush();
          Response.Close();
        }
      }

      return Content("Yay");
    }

#if polyfill
    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult Polyfill()
    {

      var request = Server.UrlDecode(Request.QueryString["url"]);
      if (String.IsNullOrEmpty(request))
      {
        return Json(new { message = "Please specify a resource" }, JsonRequestBehavior.AllowGet);
      }

      if (request.Substring(0, 2) == "//")
      {
        request = "http:" + request;
      }

      var tolerance = Request.QueryString["tolerance"];
      double _tolerance = .00000005;
      if (!String.IsNullOrEmpty(tolerance))
      {
        _tolerance = Convert.ToDouble(tolerance);
      }

      var fieldDefs = new List<KeyValuePair<string, FieldType>>();
      var memFilename = "/vsizip/vsicurl/" + request;

      try
      {
        Ogr.RegisterAll();
        var drv = Ogr.GetDriverByName("ESRI Shapefile");
        var ds = drv.Open(memFilename, 0);

        var layer = ds.GetLayerByIndex(0);
        var layerDef = layer.GetLayerDefn();
        layer.ResetReading();

        var sb = new string[layer.GetFeatureCount(0)];

        var outsrs = new SpatialReference("");
        outsrs.ImportFromEPSG(4326);

        var insrs = layer.GetSpatialRef();

        CoordinateTransformation coord_transform;
        try
        {
          coord_transform = new CoordinateTransformation(insrs, outsrs);
        }
        catch (ApplicationException ex)
        {
          insrs = new SpatialReference("");
          insrs.ImportFromEPSG(900913);
          coord_transform = new CoordinateTransformation(insrs, outsrs);
        }

        for (var i = 0; i < layerDef.GetFieldCount(); i++)
        {
          var g = layerDef.GetFieldDefn(i);
          fieldDefs.Add(new KeyValuePair<string, FieldType>(g.GetName(), g.GetFieldType()));
        }

        Feature f;
        var index = 0;
        while ((f = layer.GetNextFeature()) != null)
        {
          sb[index] = ("{\"type\":\"Feature\",\"geometry\":" + Geom(f, coord_transform, _tolerance).Replace(" ", "") +
                       ",\"properties\":{" + Props(f, fieldDefs) + "}}");
          Debug.WriteLine(index);
          index++;
        }


        var MIME = Request.QueryString["type"];
        if (!String.IsNullOrEmpty(MIME) && MIME.ToUpper() == "FILE")
        {
          return File(Encoding.UTF8.GetBytes(" { \"type\": \"FeatureCollection\",\"features\": [" + String.Join(",", sb) + "]}"), "text/plain", layer.GetName() + ".json");
        }

        return Content(" { \"type\": \"FeatureCollection\",\"features\": [" + String.Join(",", sb) + "]}",
          "application/json");
      }
      catch (Exception ex)
      {
        return Json(new { error = "Failed to locate or corrupt file" + ex.Message }, JsonRequestBehavior.AllowGet);
      }
      finally
      {
        Gdal.Unlink(memFilename);
      }
    }
#endif

    public ActionResult PutMap()
    {

      //var path = Server.MapPath("..")+@"\data\maps.sqlite";

      //var json = Request.Params["map"];

      var id = Guid.NewGuid().ToString().Substring(0, 8);

      //var maps = new SQLiteConnection(
      //    @"Data Source="+path+";");

      //maps.Open();

      //var dcmd = "insert into maps (json, id) values ("" + json + "", "" + id + "");";

      //using (var cmd = maps.CreateCommand())
      //{
      //  cmd.CommandText = dcmd;
      //  cmd.ExecuteNonQuery();
      //}

      var err = "None";
      return Json(new{id, err});
    }

    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult GetMap(string id)
    {

      //var path = Server.MapPath("..") + @"\data\maps.sqlite";

      //var maps =
      //  new SQLiteConnection(@"Data Source="+path+";");

      //maps.Open();
      string foo = "";
      //using (var cmd = maps.CreateCommand())
      //{
      //  cmd.CommandText = "select json from maps where id = ""+id+""";
      //  using (var rdr = cmd.ExecuteReader())
      //  {
      //    while (rdr.Read())
      //    {
      //      foo = rdr.GetString(0);
      //    }
      //  }
      //} 

      return Json(foo, JsonRequestBehavior.AllowGet);
    }

    [AcceptVerbs(HttpVerbs.Get)]
      public ActionResult GetLayersBySource(string source){
          var path = Server.MapPath("..") + @"\data\allegro.sqlite";

          var maps = new SQLiteConnection(@"Data Source=" + path + ";");

          maps.Open();

          var goo = new List<Dictionary<string, object>>();
          using (var cmd = maps.CreateCommand())
          {
              cmd.CommandText = "select * from layers where source = '" + source+"'";

              var rdr = cmd.ExecuteReader();
              
              while (rdr.Read())
              {
                  var foo = new Dictionary<string, object>();
                  var fields = rdr.FieldCount;

                  for (var i = 0; i < fields; i++)
                  {
                      if (rdr[i] != DBNull.Value)
                      {
                          switch (rdr.GetName(i))
                          {
                              case "legend":
                                  foo.Add("legend", DeserializeJson<Legend>((string)rdr[i]));
                                  break;
                              case "style":
                                  foo.Add("style", DeserializeJson<Style>((string)rdr[i]));
                                  break;
                              default:
                                  foo.Add(rdr.GetName(i), rdr[i]);
                                  break;
                          }
                      }
                  }
                  goo.Add(foo);
              }
          }
          return Json(goo, JsonRequestBehavior.AllowGet);
      }

    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult GetLayerByName(string name)
    {

        //name = Server.UrlDecode(name);
        name = name.Replace("-", " ");

        var path = Server.MapPath("..") + @"\data\allegro.sqlite";

        var maps = new SQLiteConnection(@"Data Source=" + path + ";");

        maps.Open();
        var foo = new Dictionary<string, object>();
        using (var cmd = maps.CreateCommand())
        {
            cmd.CommandText = "select * from layers where name = '" + name + "' limit 1";

            var rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
               
                int fields = rdr.FieldCount;

                for (int i = 0; i < fields; i++)
                {
                    if (rdr[i] != DBNull.Value)
                    {
                        foo.Add(rdr.GetName(i), rdr[i]);
                    }
                }
            }
        }
        return Json(foo, JsonRequestBehavior.AllowGet);
    }

    [AcceptVerbs(HttpVerbs.Post), ValidateInput(false)]
    public ActionResult PutLayerByName(string id)
    {
        var json = Request.Params["layer"];
        var layer = DeserializeJson<Layer>(json);
        var sql = "Update layers set ";
        var cols = new List<string>();

        foreach (PropertyInfo propertyInfo in layer.GetType().GetProperties())
        {
            if (propertyInfo.CanRead)
            {
                var val = propertyInfo.GetValue(layer, null);
                if (val != null){
                    var key = propertyInfo.Name;
                    var _val = "";
                    
                    //legend and style will need to be stringified.
                    if(key != "level" && key != "zIndex" && key!="clickable" && key!="simplify" && key!="requireToken" && key!="proxy" && key !="nodata" && key != "step" && key != "width" && key != "height"){
				       _val="\""+(string)val+"\"";
			        }else if(key=="clickable" || key=="simplify" || key=="requireToken" || key=="proxy"){
				        _val=(bool)val ? "1" : "0";
			        }
			        else{
				        _val=Convert.ToString(val);
			        }
                    cols.Add(key+"="+_val);
                }
            }
        }
        sql+=String.Join(",", cols)+" where name='"+id+"';";

        try
        {
            var path = Server.MapPath("..") + @"\data\allegro.sqlite";
            var maps = new SQLiteConnection(@"Data Source=" + path + ";");

            maps.Open();
            var cmd = maps.CreateCommand();
            cmd.CommandText = sql;
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            return Json(new { error = ex.Message });
        }
        return Json(new { success = "True" });
        //return Content(sql.ToString());
    }

#if polyfill
    private string Props(Feature f, IReadOnlyCollection<KeyValuePair<string, FieldType>> field_defs)
    {

      var index = 0;
      var t = new string[field_defs.Count];

      foreach (var kv in field_defs)
      {
        t[index] = "\"" + kv.Key + "\":";

        switch (kv.Value)
        {
          case FieldType.OFTReal:
            t[index] += (f.GetFieldAsDouble(index) + "");
            break;
          case FieldType.OFTInteger:
            t[index] += (f.GetFieldAsInteger(index) + "");
            break;
          default:
            t[index] += ("\"" + CleanString(f.GetFieldAsString(index)) + "\"");
            break;
        }
        index++;
      }

      return String.Join(",", t);
    }

    static string CleanString(string str)
    {
      return str.Replace("\"", "").TrimEnd('\r', '\n').Replace("\r", "").Replace("\n","");
    }

    static string Geom(Feature f, CoordinateTransformation ct, double tolerance, int coordinate_precision = 6)
    {
      var geom = f.GetGeometryRef();
      geom.Transform(ct);

      //if (simplification >0)
      // {

      var temp_geom = geom.Simplify(tolerance);

      if (temp_geom.IsEmpty())
      {
        var index = 0;
        var tolerances = new[] { tolerance * .0001, tolerance * .00001, tolerance * .000001, tolerance * .0000001, tolerance * .00000001, tolerance * .000000001 };

        foreach (double t in tolerances)
        {
          temp_geom = geom.Simplify(t);
          Debug.WriteLine(t);
          if (!temp_geom.IsEmpty())
          {
            Debug.WriteLine("Got it!");
            break;
          }
          index++;
        }
      }

      return temp_geom != null ? temp_geom.ExportToJson(new[] { "COORDINATE_PRECISION=" + coordinate_precision }) : "";
    }
#endif

    private static T DeserializeJson<T>(string json)
    {
        var obj = Activator.CreateInstance<T>();
        var ms = new MemoryStream(Encoding.Unicode.GetBytes(json));
        var serializer = new DataContractJsonSerializer(obj.GetType());
        obj = (T)serializer.ReadObject(ms);
        ms.Close();
        return obj;
    }

    public class Symbol
    {
        public string color { get; set; }
        public string fillColor { get; set; }
        public double? maxVal { get; set; }
        public double? minVal { get; set; }
        public string value { get; set; }
    }

    public class Legend
    {
        public List<Symbol> symbols { get; set; }
        public string type { get; set; }
    }

    public class Style
    {
        public bool? stroke { get; set; }
        public int? weight { get; set; }
        public double? fillOpacity { get; set; }
        public double? opacity { get; set; }
        public string color { get; set; }
        public string lineCap { get; set; }
        public string lineJoin { get; set; }
    }

    public class Layer
    {
        public string name { get; set; }
        public string url { get; set; }
        public string type { get; set; }
        public string thumb { get; set; }
        public string popupTemplate { get; set; }
        public string symbolField { get; set; }
        public string source { get; set; }
        public string icon { get; set; }
        public string theme { get; set; }
        public int? level { get; set; }
        public bool? proxy { get; set; }
        public bool? simplify { get; set; }
        public Legend legend { get; set; }
        public bool? clickable { get; set; }
        public Style style { get; set; }
        public int? zIndex { get; set; }
        public bool? requireToken { get; set; }
        public string metadataUrl { get; set; }
        public string defQuery { get; set; }
        public string ramp { get; set; }
        public int? nodata { get; set; }
        public string upperLeft { get; set; }
        public double? step { get; set; }
        public int? width { get; set; }
        public int? height { get; set; }
    }
  }
}