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
    public class InvestController : Controller
    {
        private readonly ApplicationDbContext _context;

        public InvestController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Invest
        public async Task<IActionResult> Index()
        {
            return View(await _context.ForeignInvestisseur.ToListAsync());
        }

        // GET: Invest/Create
        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (ForeignInvestisseurExists(foreignInvestisseur.Name))
            {
                ModelState.AddModelError("Name", "الممول موجود");
                return View(foreignInvestisseur);
            }
            
            if (ModelState.IsValid)
            {
                _context.Add(foreignInvestisseur);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(foreignInvestisseur);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foreignInvestisseur = await _context.ForeignInvestisseur.SingleOrDefaultAsync(m => m.ID == id);
            if (foreignInvestisseur == null)
            {
                return NotFound();
            }
            return View(foreignInvestisseur);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (id != foreignInvestisseur.ID)
            {
                return NotFound();
            }

            if (ForeignInvestisseurExists(foreignInvestisseur.Name))
            {
                ModelState.AddModelError("Name", "الممول موجود");
                return View(foreignInvestisseur);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(foreignInvestisseur);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ForeignInvestisseurExists(foreignInvestisseur.ID))
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
            return View(foreignInvestisseur);
        }

        private bool ForeignInvestisseurExists(int id)
        {
            return _context.ForeignInvestisseur.Any(e => e.ID == id);
        }
        private bool ForeignInvestisseurExists(string Name)
        {
            return _context.ForeignInvestisseur.Any(e => e.Name == Name);
        }
    }
}