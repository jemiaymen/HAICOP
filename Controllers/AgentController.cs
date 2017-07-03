using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HAICOP.Data;
using HAICOP.Models;

namespace HAICOP.Controllers
{
    public class AgentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AgentController(ApplicationDbContext context)
        {
            _context = context;    
        }

        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Agent.Include(a => a.Commission);
            return View(await applicationDbContext.ToListAsync());
        }

        public IActionResult Create()
        {
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl");
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
                        ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
                        return View(agent);
                    }
                }

                _context.Add(agent);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
                
            }
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agent = await _context.Agent.SingleOrDefaultAsync(m => m.ID == id);
            if (agent == null)
            {
                return NotFound();
            }
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
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
                            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
                            return View(agent);
                        }
                    }
                }
                

                try
                {
                    _context.Update(agent);
                    await _context.SaveChangesAsync();
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
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        private bool AgentExists(int id)
        {
            return _context.Agent.Any(e => e.ID == id);
        }

        private bool AgentExists(string Name , string NameFr)
        {
            return _context.Agent.Any(e => e.Name == Name && e.NameFr == NameFr);
        }

        public bool HavePresident(int ID)
        {
            return _context.Commission.Any(m => m.ID == ID && m.HavePresident == true);
        }

        public Agent HavePresidentGet(int ID)
        {
            return _context.Commission.AsNoTracking().Include(a => a.Agents).SingleOrDefault(m => m.ID == ID)
                                      .Agents.SingleOrDefault(a => a.IsPresident  == true);
        }

        public Agent GetPresident(int ID)
        {
            return _context.Agent.AsNoTracking().Include( a => a.Commission ).SingleOrDefault( a => a.CommissionID == ID  && a.IsPresident == true);
        }
    }
}
