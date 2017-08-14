using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using HAICOP.Models;
using HAICOP.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

                bool ischef = _userManager.IsInRoleAsync(ViewBag.user, "Chef").Result;
                bool israpp = _userManager.IsInRoleAsync(ViewBag.user, "Rapporteur").Result;

                if(ischef)
                {
                    string id = ViewBag.user.Id;

                    var comm = db.UserAgent.Include(a => a.Agent)
                                        .First( a => a.UserID == id && a.Agent.IsPresident == true );

                    var ret = db.Dossier.Where( d =>  d.CommissionID == comm.Agent.CommissionID && 
                                                    (d.State != DossierState.Accept && d.State != DossierState.Refus )  )
                                        .ToList();
                    ViewBag.Notif = ret;
                }
                else if(israpp)
                {
                    
                }
                else 
                {
                    var re = db.Dossier.Where( d =>  d.State != DossierState.Accept && d.State != DossierState.Refus  ).ToList();
                    ViewBag.Notif = re;
                }

            }
            catch(Exception )
            {

            }

            

            base.OnActionExecuting(filterContext);
        }
    }
}
