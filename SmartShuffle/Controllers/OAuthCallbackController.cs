using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace SmartShuffle.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowSpecificOrigin")] // Apply the CORS policy here
    public class OAuthCallbackController : ControllerBase
    {
        private readonly ILogger<OAuthCallbackController> _logger;
        
        private IRestClient restClient = new RestClient("https://accounts.spotify.com/api");


        public OAuthCallbackController(ILogger<OAuthCallbackController> logger)
        {
            _logger = logger;
        }

        [Route("GetOAuthToken")]
        [HttpGet]
        public void Get(string? code, string? state, string? error)
        {
            if (code == null)
            {
                return;
            }
            
            RestRequest request = new RestRequest((string?)null, Method.Post);
            
            string clientId = "";
            string clientSecret = "";
            byte[] plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}");
            string base64String = Convert.ToBase64String(plainTextBytes);
            
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddHeader("Authorization", $"Basic {base64String}");

            request.AddParameter("grant_type", "authorization_code");
            request.AddParameter("code", code);
            request.AddParameter("redirect_uri", "https://localhost:44324/OAuthCallback/GetOAuthToken");
            
            RestResponse response = restClient.Execute(request);
        }
    }
}
