using System;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Configuration;


namespace Allegro
{

    public class Global : HttpApplication
    {

        internal static string APP_NAME;
        internal static string BASE_URL;
        internal static string MACH_PATH;

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern bool
          SetEnvironmentVariable(string lpName, string lpValue);

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               "Proxy", // Route name
               "proxy/", // URL with parameters
               new { controller = "Allegro", action = "Proxy" } // Parameter defaults
           );

            routes.MapRoute(
               "Put map", // Route name
               "putMap/", // URL with parameters
               new { controller = "Allegro", action = "PutMap" } // Parameter defaults
           );

            routes.MapRoute(
               "Get Map", // Route name
               "getMap/{id}", // URL with parameters
               new { controller = "Allegro", action = "GetMap" } // Parameter defaults
           );

            routes.MapRoute(
               "Get Layers by source", // Route name
               "getLayersBySource/{source}", // URL with parameters
               new { controller = "Allegro", action = "GetLayersBySource" } // Parameter defaults
           );

            routes.MapRoute(
              "Get Layer by Name", // Route name
              "getLayerByName/{name}", // URL with parameters
              new { controller = "Allegro", action = "GetLayerByName" } // Parameter defaults
          );

            routes.MapRoute(
              "Put Layer by Name", // Route name
              "putLayerByName/{layerName}", // URL with parameters
              new { controller = "Allegro", action = "PutLayerByName" } // Parameter defaults
          );

            routes.MapRoute(
                "Polyfill", // Route name
                "polyfill/", // URL with parameters
                new { controller = "Allegro", action = "Polyfill" } // Parameter defaults
            );
        }

        protected void Application_Start()
        {

          //put db in memory?
          var GDAL_HOME = @"C:\Program Files\GDAL"; // for example
          var path = Environment.GetEnvironmentVariable("PATH");
          path += ";" + GDAL_HOME;
          SetEnvironmentVariable("PATH", path);

          SetEnvironmentVariable("GDAL_DATA",  @"C:\Program Files\GDAL\gdal-data");

            AreaRegistration.RegisterAllAreas();

            RegisterRoutes(RouteTable.Routes);

            var mach = Environment.MachineName;

            switch (mach)
            {
                case "DRCWA":
                case "DRC10":
                case "DRC09":
                    MACH_PATH = "gis.oregonmetro.gov";
                    break;
                case "DRC05":
                    MACH_PATH = "qagis";
                    break;
                case "DRC06":
                    MACH_PATH = "devgis";
                    break;
                default:
                    MACH_PATH = "localhost";
                    break;
            }

            APP_NAME = ConfigurationManager.AppSettings["APP_NAME"]+"/";
            
            BASE_URL= "//" + MACH_PATH + "/" + APP_NAME;
        }
    }
}