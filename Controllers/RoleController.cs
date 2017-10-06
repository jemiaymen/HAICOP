using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace HAICOP.Controllers
{
    [Authorize(Roles = "root")]
    public class RoleController : BaseCtrl
    {

        private readonly ILogger _logger;
        public RoleController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db,ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db)  
        { 
            _logger = loggerFactory.CreateLogger<RoleController>();
        }

        public async Task<IActionResult> Index()
        {
            return View(await db.ApplicationRole.ToListAsync());
        }

        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var applicationRole = await db.ApplicationRole
                .SingleOrDefaultAsync(m => m.Id == id);
            if (applicationRole == null)
            {
                return NotFound();
            }

            return View(applicationRole);
        }

        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Description,Id,Name,NormalizedName,ConcurrencyStamp")] ApplicationRole applicationRole)
        {
            applicationRole.NormalizedName = applicationRole.Name.ToUpper();
            if (ModelState.IsValid)
            {
                db.Add(applicationRole);
                await db.SaveChangesAsync();
                _logger.LogDebug(1,$"Admin : {ViewBag.user.UserName} Add Role : {applicationRole.Name} .");
                return RedirectToAction("Index");
            }
            return View(applicationRole);
        }


        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var applicationRole = await db.ApplicationRole.SingleOrDefaultAsync(m => m.Id == id);
            if (applicationRole == null)
            {
                return NotFound();
            }
            return View(applicationRole);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Description,Id,Name,NormalizedName,ConcurrencyStamp")] ApplicationRole applicationRole)
        {
            if (id != applicationRole.Id)
            {
                return NotFound();
            }
            applicationRole.NormalizedName = applicationRole.Name.ToUpper();
            if (ModelState.IsValid)
            {
                try
                {
                    
                    var role = await db.ApplicationRole.FindAsync(id);
                    role.Description = applicationRole.Description;
                    role.Name = applicationRole.Name;
                    role.NormalizedName = applicationRole.NormalizedName;
                    role.ConcurrencyStamp = applicationRole.ConcurrencyStamp;

                    db.Update(role);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"Admin : {ViewBag.user.UserName} Edit RoleID : {applicationRole.Id} .");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ApplicationRoleExists(applicationRole.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            return View(applicationRole);
        }


        private bool ApplicationRoleExists(string id)
        {
            return db.ApplicationRole.Any(e => e.Id == id);
        }
    }
}
