using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using HAICOP.Models;
using HAICOP.Data;


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

            ViewBag.user = _userManager.GetUserAsync(HttpContext.User ).Result;
            base.OnActionExecuting(filterContext);
        }
    }
}
