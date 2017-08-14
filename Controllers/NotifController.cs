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
    [Authorize(Roles ="root,Admin,President,Chef,Rapporteur")]
    public class NotifController : BaseCtrl
    {

        private ILogger _logger;

        public NotifController (UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                                ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<NotifController>();
    
        }

        public async Task<dynamic> Index()
        {
            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool israpp = await _userManager.IsInRoleAsync(ViewBag.user, "Rapporteur");

            if(ischef)
            {

            }
            else if(israpp)
            {

            }
            else 
            {

            }

            return View();
        }



        
    }
}