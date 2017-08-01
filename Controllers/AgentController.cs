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

namespace HAICOP.Controllers
{
    [Authorize(Roles ="root,Admin")]
    public class AgentController : BaseCtrl
    {

        public AgentController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
                                base(userManager,signInManager,db) 
        {}

        public async Task<IActionResult> Index()
        {
            var applicationDbContext = db.Agent.Include(a => a.Commission);
            return View(await applicationDbContext.ToListAsync());
        }

        public IActionResult Create()
        {
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,CommissionID,Name,NameFr,IsPresident")] Agent agent)
        {
            if(AgentExists(agent.Name , agent.NameFr))
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
                        return RedirectToAction("Index");
                    }
                }

                db.Add(agent);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
                
            }
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        public async Task<IActionResult> Edit(int? id)
        {
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
            if (id != agent.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if(agent.IsPresident)
                {
                    var president = HavePresidentGet(agent.ID);
                    if(president !=  null)
                    {
                        if( president.ID != agent.ID)
                        {
                            ModelState.AddModelError("IsPresident", "لديها رئيس");
                            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", agent.CommissionID);
                            return View(agent);
                        }
                        else
                        {
                            db.Update(agent);
                            var comm = await db.Commission.FindAsync(agent.CommissionID);
                            comm.HavePresident = true;
                            db.Update(comm);
                            await db.SaveChangesAsync();
                            return RedirectToAction("Index");
                        }
                    }
                }

                    try
                    {
                        db.Update(agent);
                        await db.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!AgentExists(agent.ID))
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
            return db.Agent.AsNoTracking().Include( a => a.Commission ).SingleOrDefault( a => a.CommissionID == ID  && a.IsPresident == true);
        }
    }
}
