using System.Linq;
using System.Web;
using System.Net;
using System.IO;

namespace simpleProxy
{
    /// <summary>
    /// Summary description for index
    /// </summary>
    public class index : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //var request = "http://navigator.state.or.us/sdl/data/shapefile/k24/owrd_admin_basins.zip";
            var request= context.Server.UrlDecode(context.Request.Params["file"]);

            if (request.ToUpper().IndexOf("HTTP") != -1)
            {

                HttpWebRequest webRequest = HttpWebRequest.Create(request) as HttpWebRequest;

                // Important! Keeps the request from blocking after the first time!
                webRequest.KeepAlive = false;
                webRequest.Credentials = CredentialCache.DefaultCredentials;
                using (HttpWebResponse backendResponse = (HttpWebResponse) webRequest.GetResponse())
                {
                    Stream receiveStream = backendResponse.GetResponseStream();

                    // Clear whatever is already sent
                    context.Response.Clear();
                    context.Response.ClearContent();
                    context.Response.ClearHeaders();

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
                        context.Response.AppendHeader(header, backendResponse.Headers[header]);
                    }
                    // Copy content           
                    byte[] buff = new byte[1024];
                    long length = 0;
                    int bytes;
                    while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
                    {
                        length += bytes;
                        context.Response.OutputStream.Write(buff, 0, bytes);
                    }

                    // Manually add content-lenght header to satisfy IE
                    if (!contentLenghtFound)
                    {
                        context.Response.AppendHeader("Content-Length",
                            length.ToString());
                    }

                    context.Response.AppendHeader("ContentType", "application/x-zip-compressed");
                    context.Response.AppendHeader("Content-Disposition",
                        "attachment; filename=" + backendResponse.ResponseUri.LocalPath.Split('/').Last());

                    receiveStream.Close();
                    backendResponse.Close();
                    context.Response.Flush();
                    context.Response.Close();
                }
            }
            else //FTP
            {
                FtpWebRequest webRequest = FtpWebRequest.Create(request) as FtpWebRequest;

                // Important! Keeps the request from blocking after the first time!
                webRequest.KeepAlive = false;
                //webRequest.Credentials = CredentialCache.DefaultCredentials;
                using (FtpWebResponse backendResponse = (FtpWebResponse)webRequest.GetResponse())
                {
                    Stream receiveStream = backendResponse.GetResponseStream();

                    // Clear whatever is already sent
                    context.Response.Clear();
                    context.Response.ClearContent();
                    context.Response.ClearHeaders();

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
                        context.Response.AppendHeader(header, backendResponse.Headers[header]);
                    }
                    // Copy content           
                    byte[] buff = new byte[1024];
                    long length = 0;
                    int bytes;
                    while ((bytes = receiveStream.Read(buff, 0, 1024)) > 0)
                    {
                        length += bytes;
                        context.Response.OutputStream.Write(buff, 0, bytes);
                    }

                    // Manually add content-lenght header to satisfy IE
                    if (!contentLenghtFound)
                    {
                        context.Response.AppendHeader("Content-Length",
                            length.ToString());
                    }

                    context.Response.AppendHeader("ContentType", "application/x-zip-compressed");
                    context.Response.AppendHeader("Content-Disposition",
                        "attachment; filename=" + backendResponse.ResponseUri.LocalPath.Split('/').Last());

                    receiveStream.Close();
                    backendResponse.Close();
                    context.Response.Flush();
                    context.Response.Close();
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}