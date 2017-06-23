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

        // GET: Controllers/Agent
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Agent.Include(a => a.Commission);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: Controllers/Agent/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agent = await _context.Agent
                .Include(a => a.Commission)
                .SingleOrDefaultAsync(m => m.ID == id);
            if (agent == null)
            {
                return NotFound();
            }

            return View(agent);
        }

        // GET: Controllers/Agent/Create
        public IActionResult Create()
        {
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl");
            return View();
        }

        // POST: Controllers/Agent/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,CommissionID,Name,NameFr,IsPresident")] Agent agent)
        {
            if (ModelState.IsValid)
            {
                _context.Add(agent);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", agent.CommissionID);
            return View(agent);
        }

        // GET: Controllers/Agent/Edit/5
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

        // POST: Controllers/Agent/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
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

        // GET: Controllers/Agent/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agent = await _context.Agent
                .Include(a => a.Commission)
                .SingleOrDefaultAsync(m => m.ID == id);
            if (agent == null)
            {
                return NotFound();
            }

            return View(agent);
        }

        // POST: Controllers/Agent/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var agent = await _context.Agent.SingleOrDefaultAsync(m => m.ID == id);
            _context.Agent.Remove(agent);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool AgentExists(int id)
        {
            return _context.Agent.Any(e => e.ID == id);
        }
    }
}
