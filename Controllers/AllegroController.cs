
using System;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace Allegro.Controllers
{
  public class AllegroController : Controller
  {

    //proxy/%2F%2Flibrary.oregonmetro.gov%2Frlisdiscovery%2Fcouncil1993.zip
    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult Proxy()
    {

      var request = Server.UrlDecode(Request.QueryString["url"]);

      //return Content(request);

      if (request.ToUpper().IndexOf("HTTP") != -1)
      {

        var webRequest = HttpWebRequest.Create(request) as HttpWebRequest;

        // Important! Keeps the request from blocking after the first time!
        webRequest.KeepAlive = false;
        webRequest.Credentials = CredentialCache.DefaultCredentials;
        using (HttpWebResponse backendResponse = (HttpWebResponse) webRequest.GetResponse())
        {
          Stream receiveStream = backendResponse.GetResponseStream();

          // Clear whatever is already sent
          Response.Clear();
          Response.ClearContent();
          Response.ClearHeaders();

          // Copy headers
          // Check if header contains a contenth-lenght since IE
          // goes bananas if this is missing
          bool contentLenghtFound = false;
          foreach (string header in backendResponse.Headers)
          {
            if (string.Compare(header, "CONTENT-LENGTH", true) == 0)
            {
              contentLenghtFound = true;
            }
            Response.AppendHeader(header, backendResponse.Headers[header]);
          }
          // Copy content           
          byte[] buff = new byte[1024];
          long length = 0;
          int bytes;
          while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
          {
            length += bytes;
            Response.OutputStream.Write(buff, 0, bytes);
          }

          // Manually add content-lenght header to satisfy IE
          if (!contentLenghtFound)
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
        FtpWebRequest webRequest = FtpWebRequest.Create(request) as FtpWebRequest;

        // Important! Keeps the request from blocking after the first time!
        webRequest.KeepAlive = false;
        //webRequest.Credentials = CredentialCache.DefaultCredentials;
        using (FtpWebResponse backendResponse = (FtpWebResponse) webRequest.GetResponse())
        {
          Stream receiveStream = backendResponse.GetResponseStream();

          // Clear whatever is already sent
          Response.Clear();
          Response.ClearContent();
          Response.ClearHeaders();

          // Copy headers
          // Check if header contains a contenth-lenght since IE
          // goes bananas if this is missing
          bool contentLenghtFound = false;
          foreach (string header in backendResponse.Headers)
          {
            if (string.Compare(header, "CONTENT-LENGTH", true) == 0)
            {
              contentLenghtFound = true;
            }
            Response.AppendHeader(header, backendResponse.Headers[header]);
          }
          // Copy content           
          byte[] buff = new byte[1024];
          long length = 0;
          int bytes;
          while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
          {
            length += bytes;
            Response.OutputStream.Write(buff, 0, bytes);
          }

          // Manually add content-lenght header to satisfy IE
          if (!contentLenghtFound)
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

    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult PutMap()
    {

      var path = Server.MapPath("..")+@"\data\maps.sqlite";

      var json = Request.Params["map"];

      var id = Guid.NewGuid().ToString().Substring(0, 8);

      var maps = new SQLiteConnection(
          @"Data Source="+path+";");

      maps.Open();

      var dcmd = "insert into maps (json, id) values ('" + json + "', '" + id + "');";

      using (var cmd = maps.CreateCommand())
      {
        cmd.CommandText = dcmd;
        cmd.ExecuteNonQuery();
      }
      return Content(id);
    }

    [AcceptVerbs(HttpVerbs.Get)]
    public ActionResult GetMap(string id)
    {

      var path = Server.MapPath("..") + @"\data\maps.sqlite";

      var maps =
        new SQLiteConnection(@"Data Source="+path+";");

      maps.Open();
      string foo="";
      using (var cmd = maps.CreateCommand())
      {
        cmd.CommandText = "select json from maps where id = '"+id+"'";
        using (var rdr = cmd.ExecuteReader())
        {
          while (rdr.Read())
          {
            foo = rdr.GetString(0);
          }
        }
      } 

      return Json(foo, JsonRequestBehavior.AllowGet);
    }
  }
}