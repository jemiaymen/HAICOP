using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace HAICOP.Controllers
{
    [Authorize]
    public class OJController : BaseCtrl
    {

        private readonly ILogger _logger;
        private IHostingEnvironment _environment;

        public OJController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory, IHostingEnvironment environment) :
                            base(userManager,signInManager,db) 
        { 
            _logger = loggerFactory.CreateLogger<DessController>();
            _environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Membre()
        {
            return View();
        }

        public IActionResult MembreEdit(int? MembreID,int? CommissionID)
        {
            return View();
        }



        #region helper
        private async Task<string> Upload(IFormFile Location,string Folder,string ext)
        {
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, Folder), Guid.NewGuid().ToString() + ext);
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Location.CopyToAsync(fileStream);
                }
                return Path.GetFileName(filePath);
            }
            catch (Exception)
            {
                return "";
            }
        }

        #endregion
    }
}
