using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using HAICOP.Models;
using HAICOP.Data;
using System;

namespace HAICOP.Controllers
{
    public class BaseCtrl : Controller
    {   
        public UserManager<ApplicationUser> _userManager;
        public SignInManager<ApplicationUser> _signInManager;
        public ApplicationDbContext db;

        public BaseCtrl(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext _db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            db = _db;
        }


        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                ViewBag.user = _userManager.GetUserAsync(HttpContext.User ).Result;


                if(_userManager.IsInRoleAsync(ViewBag.user, "Chef").Result)
                {
                    ViewBag.role = "Chef";
                }

                if(_userManager.IsInRoleAsync(ViewBag.user, "Rapporteur").Result)
                {
                    ViewBag.role = "Rapporteur";
                }

                if(_userManager.IsInRoleAsync(ViewBag.user, "BOC").Result)
                {
                    ViewBag.role = "BOC";
                }

                if(_userManager.IsInRoleAsync(ViewBag.user, "President").Result)
                {
                    ViewBag.role = "President";
                }

                if(_userManager.IsInRoleAsync(ViewBag.user, "Admin").Result)
                {
                    ViewBag.role = "Admin";
                }

                if (_userManager.IsInRoleAsync(ViewBag.user, "root").Result)
                {
                    ViewBag.role = "root";
                }

                if (_userManager.IsInRoleAsync(ViewBag.user, "assistant").Result)
                {
                    ViewBag.role = "assistant";
                }
            }
            catch(Exception )
            {

            }
            base.OnActionExecuting(filterContext);
        }
    }
}
