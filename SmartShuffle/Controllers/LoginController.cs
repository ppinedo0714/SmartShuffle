using System.Data;
using Microsoft.AspNetCore.Mvc;

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
        string query = $"SELECT userId FROM lu_login " +
                       $"WHERE username = '{username}' AND password = '{password}'";
        DataTable loginDataTable = _dataAccess.ExecuteQuery(query);

        int? userId = loginDataTable.Rows.Count != 0 ? (int)loginDataTable.Rows[0][0] : null;

        return Ok(new { userId } );
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