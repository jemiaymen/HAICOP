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
                bool isboc = _userManager.IsInRoleAsync(ViewBag.user,"BOC").Result;
                bool ispre = _userManager.IsInRoleAsync(ViewBag.user,"President").Result;
                bool isadmin = _userManager.IsInRoleAsync(ViewBag.user,"Admin").Result;
                bool isroot = _userManager.IsInRoleAsync(ViewBag.user,"root").Result;
                bool isassitant = _userManager.IsInRoleAsync(ViewBag.user,"assistant").Result;
                string id = ViewBag.user.Id;
                
                if(ischef)
                {
                    ViewBag.role = "Chef";
                    var comm = db.UserAgent.Include(a => a.Agent)
                                        .First( a => a.UserID == id && a.Agent.IsPresident == true );

                    var ret = db.Dossier.Where( d =>  d.CommissionID == comm.Agent.CommissionID && 
                                                    (d.State != DossierState.Accept && d.State != DossierState.Refus )  )
                                        .ToList();
                    ViewBag.Notif = ret;
                }
                else if(israpp)
                {
                    ViewBag.role = "Rapporteur";
                }
                else if(isboc)
                {
                    ViewBag.role = "BOC";
                    var comm = db.UserCommission.Where( a => a.UserID == id )
                                                .AsNoTracking()
                                                .Select(a => a.CommissionID).ToList();
                                            
                    var ret = db.Dossier.Where( d => comm.Contains(d.CommissionID) &&
                                              (d.State != DossierState.Accept && d.State != DossierState.Refus ) )
                                        .ToList();
                    ViewBag.Notif = ret;
                }
                else if(ispre)
                {
                    ViewBag.role = "President";
                    var re = db.Dossier.Where( d =>  d.State != DossierState.Accept && d.State != DossierState.Refus  ).ToList();
                    ViewBag.Notif = re;
                }

                else if(isadmin)
                {
                    ViewBag.role = "Admin";
                    var re = db.Dossier.Where( d =>  d.State != DossierState.Accept && d.State != DossierState.Refus  ).ToList();
                    ViewBag.Notif = re;
                }

                else if(isroot)
                {
                    ViewBag.role = "root";
                    var re = db.Dossier.Where( d =>  d.State != DossierState.Accept && d.State != DossierState.Refus  ).ToList();
                    ViewBag.Notif = re;
                }

                else if(isassitant)
                {
                    ViewBag.role = "assistant";
                    var comm = db.UserCommission.Where( a => a.UserID == id )
                                                .AsNoTracking()
                                                .Select(a => a.CommissionID).ToList();
                                            
                    var ret = db.Dossier.Where( d => comm.Contains(d.CommissionID) &&
                                              (d.State != DossierState.Accept && d.State != DossierState.Refus ) )
                                        .ToList();
                    ViewBag.Notif = ret;
                }
                

            }
            catch(Exception )
            {

            }

            

            base.OnActionExecuting(filterContext);
        }
    }
}
