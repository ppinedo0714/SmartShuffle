using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace SmartShuffle.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly ILogger<OAuthController> _logger;

    private readonly IConfiguration _configuration;

    private readonly DataAccess _dataAccess;

    public LoginController(ILogger<OAuthController> logger, IConfiguration configuration, DataAccess dataAccess)
    {
        _logger = logger;
        _configuration = configuration;
        _dataAccess = dataAccess;
    }

    [Route("LoginAccount")]
    [HttpGet]
    public IActionResult LoginAccount(string username, string password)
    {
        // Validate that user exists
        string query = $"SELECT userId FROM lu_login " +
                       $"WHERE username = '{username}' AND password = '{password}'";
        DataTable loginDataTable = _dataAccess.ExecuteQuery(query);

        int? userId = loginDataTable.Rows.Count != 0 ? (int)loginDataTable.Rows[0][0] : null;
        
        if (userId == null)
        {
            // If user does not exist, return null
            return NotFound();
        }

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim("username", username),
                new Claim("userId", userId.ToString()!)
                // optionally more claims
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        var jwt = tokenHandler.WriteToken(token);

        // The important part: return as JSON with property "token"
        return Ok(new { token = jwt });
    }

    [Route("CreateAccount")]
    [HttpGet]
    public IActionResult CreateAccount(string username, string password)
    {
        string query1 = $"SELECT COUNT(userId) FROM lu_login " +
                    $"WHERE username = '{username}'";
        DataTable loginDataTable = _dataAccess.ExecuteQuery(query1);

        bool isNewUser = (int)loginDataTable.Rows[0][0] != 1;

        if (!isNewUser)
        {
            return Ok( isNewUser );
        }

        string query2 = $"INSERT INTO lu_login (username, password) " +
                        $"VALUES ('{username}', '{password}')";
        _dataAccess.ExecuteNonQuery(query2);
        
        return Ok ( isNewUser );
    }
}