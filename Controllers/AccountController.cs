using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

using HAICOP.Models;
using HAICOP.Data;
using HAICOP.Models.AccountViewModels;
using HAICOP.Services;

namespace HAICOP.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly string _externalCookieScheme;
        private readonly ApplicationDbContext db;
        private readonly RoleManager<ApplicationRole> _roleManager ;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<ApplicationRole> roleManager,
            ApplicationDbContext _db,
            IOptions<IdentityCookieOptions> identityCookieOptions,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            db = _db;
            _roleManager = roleManager;
            _externalCookieScheme = identityCookieOptions.Value.ExternalCookieAuthenticationScheme;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.Authentication.SignOutAsync(_externalCookieScheme);

            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");
                    return RedirectToLocal(returnUrl);
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning(2, "User account locked out.");
                    return View("Lockout");
                }
                else
                {
                    ModelState.AddModelError("Password", "تثبت من المستخدم وكلمة السر");
                    return View(model);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        public IActionResult Register(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            RegisterViewModel model = new RegisterViewModel { Roles =  _roleManager.Roles.ToList() };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email , FirstLastName = model.FirstLastName  };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, model.Role);
                    //await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(3, "User created a new account with password.");
                    return RedirectToLocal(returnUrl);
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            model.Roles = _roleManager.Roles.ToList();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpGet]
        public IActionResult Logout(string returnUrl ="") 
        {
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> ChangePassword(ChangePassword model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(model.UserId);
                var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation(3, "User change password.");
                    return true;
                }
            }
            return false;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> EditProfile(ChangeProfile model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(model.UserId);
                user.Email = model.Email;
                user.UserName = model.UserName;
                user.FirstLastName = model.FirstLastName;

                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    _logger.LogInformation(3, "User edit profile.");
                    return true;
                }
            }
            return false;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<RegisterViewModel> list = new List<RegisterViewModel>();

            foreach (var user in _userManager.Users.ToList())
            {              
                list.Add(new RegisterViewModel() {
                    UserId = user.Id, 
                    FirstLastName = user.FirstLastName,
                    UserName = user.UserName,
                    Email = user.Email,
                    StringRoles = await _userManager.GetRolesAsync(user)
                   
                });
            }

            return View(list);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string Id)
        {
            if (Id == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound();
            }

            var model = new EditProfileViewModel {
                UserId = user.Id, 
                FirstLastName = user.FirstLastName,
                UserName = user.UserName,
                Email = user.Email,
                StringRoles = await _userManager.GetRolesAsync(user)
            };
            model.Roles = _roleManager.Roles.ToList();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string Id,EditProfileViewModel model)
        {
             if (Id != model.UserId)
            {
                return NotFound();
            }
            
            var user = await _userManager.FindByIdAsync(model.UserId);
            user.Email = model.Email;
            user.UserName = model.UserName;
            user.FirstLastName = model.FirstLastName;


            string existingRole = _userManager.GetRolesAsync(user).Result.Single(); 
            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(user);
                    await db.SaveChangesAsync();
                    var isInRole = await _userManager.IsInRoleAsync(user, model.Role);
                    if(!isInRole)
                    {
                        await _userManager.RemoveFromRoleAsync(user, existingRole);  
                        await _userManager.AddToRoleAsync(user, model.Role);
                    }
                }
                catch (Exception)
                {
                    
                }
                return RedirectToAction("Index");
            }

            return View(user);
        }


        [HttpGet]
        public async Task<IActionResult> ResetPassword(string Id)
        {
            if (Id == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(Id);
            if (user == null)
            {
                return NotFound();
            }
            var model = new ResetPasswordViewModel {
                UserId = user.Id
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(string Id,ResetPasswordViewModel model)
        {
            if (Id != model.UserId)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user != null)
            {
                await _userManager.RemovePasswordAsync(user);
                var result = await _userManager.AddPasswordAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                AddErrors(result);
                return View(model);
            }
            return NotFound();
        }

#region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

#endregion

    }
}
