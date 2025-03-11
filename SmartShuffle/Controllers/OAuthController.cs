using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using SmartShuffle.Data;

namespace SmartShuffle.Controllers;

[ApiController]
[Route("[controller]")]
public class OAuthController : ControllerBase
{
    private readonly ILogger<OAuthController> _logger;

    private readonly IConfiguration _configuration;

    private readonly DataAccess _dataAccess;
        
    private IRestClient restClient = new RestClient("https://accounts.spotify.com");

    public OAuthController(ILogger<OAuthController> logger, IConfiguration configuration, DataAccess dataAccess)
    {
        _logger = logger;
        _configuration = configuration;
        _dataAccess = dataAccess;
    }

    [Route("GetAuthorizationCode")]
    [HttpGet]
    public OAuthAuthorizationResponse Get(string? redirectUri, bool showDialog = false)
    {
        return new OAuthAuthorizationResponse {
            Url = "https://accounts.spotify.com/authorize?" + 
                  $"client_id={_configuration["SpotifyCredentials:ClientId"]}&" + 
                  "response_type=code&" +
                  $"redirect_uri={redirectUri}&" +
                  $"show_dialog={showDialog}'"};
    }

    [Route("GetOAuthToken")]
    [HttpGet]
    public void Get(string? code, string? state, string? error)
    {
        if (code == null)
        {
            return;
        }
            
        RestRequest request = new RestRequest("/api/token", Method.Post);
            
        string clientId = _configuration["SpotifyCredentials:ClientId"] ?? string.Empty;
        string clientSecret = _configuration["SpotifyCredentials:ClientSecret"] ?? string.Empty;
        byte[] plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}");
        string base64String = Convert.ToBase64String(plainTextBytes);
            
        request.AddHeader("content-type", "application/x-www-form-urlencoded");
        request.AddHeader("Authorization", $"Basic {base64String}");

        request.AddParameter("grant_type", "authorization_code");
        request.AddParameter("code", code);
        request.AddParameter("redirect_uri", "http://localhost:4200/oAuthLanding");
            
        RestResponse response = restClient.Execute(request);

        OAuthToken token = JsonConvert.DeserializeObject<OAuthToken>(response.Content);
            
        string query = $"INSERT INTO lu_oauth_access_token (userId, accessToken, scope, expireTimeUtc, refreshToken) " +
                       $"VALUES ('1', '{token.access_token}', '', '{DateTime.UtcNow.AddSeconds(token.expires_in)}', '{token.refresh_token}')";
        int rowsAffected = _dataAccess.ExecuteNonQuery(query);
    }
}