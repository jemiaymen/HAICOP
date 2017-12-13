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
    [Authorize(Roles ="root,Admin")]
    public class AgentController : BaseCtrl
    {

        private readonly ILogger _logger;
        public AgentController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<AgentController>();
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.Menu = "تحيين مقرر";
            var applicationDbContext = db.Agent.Include(a => a.Commission);
            return View(await applicationDbContext.ToListAsync());
        }

        public IActionResult Create()
        {
            ViewBag.Menu = "إضافة مقرر";
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,CommissionID,Name,NameFr,IsPresident")] Agent agent)
        {
            ViewBag.Menu = "إضافة مقرر";
            if (AgentExists(agent.Name , agent.NameFr))
            {
                ModelState.AddModelError("Name", " موجود");
                ModelState.AddModelError("NameFr", " موجود");
                return View(agent);
            }

            if (ModelState.IsValid)
            {
                if(agent.IsPresident)
                {
                    if(HavePresident(agent.CommissionID))
                    {
                        ModelState.AddModelError("IsPresident", "لديها رئيس");
                        ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
                        return View(agent);
                    }
                    else
                    {
                        db.Add(agent);
                        var comm = await db.Commission.FindAsync(agent.CommissionID);
                        comm.HavePresident = true;
                        db.Update(comm);
                        await db.SaveChangesAsync();

                        _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Agent : {agent.NameFr} .");

                        return RedirectToAction("Index");
                    }
                }

                db.Add(agent);
                await db.SaveChangesAsync();

                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Agent : {agent.NameFr} .");

                return RedirectToAction("Index");
                
            }
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Menu = "تحيين مقرر";
            if (id == null)
            {
                return NotFound();
            }

            var agent = await db.Agent.SingleOrDefaultAsync(m => m.ID == id);
            if (agent == null)
            {
                return NotFound();
            }
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,CommissionID,Name,NameFr,IsPresident")] Agent agent)
        {
            ViewBag.Menu = "تحيين مقرر";
            if (id != agent.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if(agent.IsPresident)
                {
                    var president = GetPresident(agent.CommissionID);

                    if(president != null)
                    {
                        president.IsPresident = false;
                        var ag = await db.Agent.FindAsync(id);
                        ag.CommissionID = agent.CommissionID;
                        ag.Name = agent.Name;
                        ag.NameFr = agent.NameFr;
                        ag.IsPresident = agent.IsPresident;
                        db.Update(ag);
                    }

                    var age = await db.Agent.FindAsync(id);
                    age.CommissionID = agent.CommissionID;
                    age.Name = agent.Name;
                    age.NameFr = agent.NameFr;
                    age.IsPresident = agent.IsPresident;
                    db.Update(age);

                    var com = await db.Commission.FindAsync(agent.CommissionID);
                    com.HavePresident = true;
                    db.Update(com);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Agent : {agent.NameFr} .");
                    return RedirectToAction("Index");
                }

                var comm = await db.Commission.FindAsync(agent.CommissionID);
                comm.HavePresident = HavePresident(agent.CommissionID);

                db.Update(agent);
                await db.SaveChangesAsync();
                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Agent : {agent.NameFr} .");
                            
                return RedirectToAction("Index");
            }
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        private bool AgentExists(int id)
        {
            return db.Agent.Any(e => e.ID == id);
        }

        private bool AgentExists(string Name , string NameFr)
        {
            return db.Agent.Any(e => e.Name == Name && e.NameFr == NameFr);
        }

        public bool HavePresident(int ID)
        {
            return db.Commission.Any(m => m.ID == ID && m.HavePresident == true);
        }

        public Agent HavePresidentGet(int ID)
        {
            return db.Commission.AsNoTracking().Include(a => a.Agents).SingleOrDefault(m => m.ID == ID)
                                      .Agents.SingleOrDefault(a => a.IsPresident  == true);
        }

        public Agent GetPresident(int ID)
        {
            return db.Agent.Include( a => a.Commission ).SingleOrDefault( a => a.CommissionID == ID  && a.IsPresident == true);
        }
    }
}
