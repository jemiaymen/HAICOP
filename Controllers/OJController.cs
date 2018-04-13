using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace HAICOP.Controllers
{
    [Authorize]
    public class OJController : BaseCtrl
    {

        private readonly ILogger _logger;
        private IHostingEnvironment _environment;

        public OJController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory, IHostingEnvironment environment) :
                            base(userManager,signInManager,db) 
        { 
            _logger = loggerFactory.CreateLogger<DessController>();
            _environment = environment;
        }

        public IActionResult Index()
        {
            var oj = db.OJ.Include(a => a.Dossier).Include(a => a.Invite).Where(a => a.CommissionID == Commission());
            return View(oj);
        }

        public IActionResult Edit(int? id)
        {
            var tmp = db.OJ.FirstOrDefault(a => a.ID == id);
            if(tmp == null)
            {
                return NotFound();
            }

            return View(tmp);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Add()
        {
            db.OJ.Add(Generate());
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Num,Year")] OJ oj)
        {
            if(ModelState.IsValid)
            {
                var tmp = await db.OJ.FirstOrDefaultAsync(a => a.ID == id);

                if(tmp != null)
                {
                    tmp.Num = oj.Num;
                    tmp.Year = oj.Year;

                    await db.SaveChangesAsync();
                }

                return RedirectToAction("Index");

            }

            oj.ID = id;
            return View(oj);
        }


        public IActionResult AddDoc(int? id)
        {
            var tmp = db.OJ.FirstOrDefault(a => a.ID == id);
            if (tmp == null)
            {
                return NotFound();
            }

            var dossier = db.Dossier.Where(a => a.CommissionID == Commission() && a.State != DossierState.Accept && a.State != DossierState.Refus);

            ViewData["DossierID"] = new SelectList(dossier,"ID","Subject");

            return View(new DocInOJ { OJID = tmp.ID, OJ = tmp  });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddDoc(int OJID, [Bind("OJID,DossierID,Date")] DocInOJ doc)
        {
            if(ModelState.IsValid)
            {
                var tmp = await db.OJ.FirstOrDefaultAsync(a => a.ID == OJID);


                if(tmp == null)
                {
                    return NotFound();
                }

                db.DocInOJ.Add(doc);

                await db.SaveChangesAsync();

                tmp.Dossier.Add(doc);

                await db.SaveChangesAsync();

                return RedirectToAction("Index");

            }

            var dossier = db.Dossier.Where(a => a.CommissionID == Commission() && a.State != DossierState.Accept && a.State != DossierState.Refus);
            ViewData["DossierID"] = new SelectList(dossier, "ID","Subject",doc.DossierID);

            return View(doc);
        }


        public IActionResult AddMembre(int? id)
        {
            var tmp = db.OJ.FirstOrDefault(a => a.ID == id);
            if (tmp == null)
            {
                return NotFound();
            }


            //ViewData["GueInAchID"] = new SelectList(db.GuestInAcheteur.Include(a => a.Guest), "ID", "Guest.FirstLastName");

            return View(new Invite { OJID = tmp.ID, OJ = tmp });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMembre(int OJID, [Bind("OJID,GueInAchID")] Invite invite)
        {
            if (ModelState.IsValid)
            {
                var tmp = await db.OJ.FirstOrDefaultAsync(a => a.ID == OJID);


                if (tmp == null)
                {
                    return NotFound();
                }

                db.Invite.Add(invite);

                await db.SaveChangesAsync();

                tmp.Invite.Add(invite);

                await db.SaveChangesAsync();

                return RedirectToAction("Index");

            }

            //ViewData["GueInAchID"] = new SelectList(db.GuestInAcheteur.Include(a => a.Guest), "ID", "Guest.FirstLastName");

            return View(invite);
        }



        public IActionResult Doc(int? id)
        {

            var tmp = db.DocInOJ.Include(a => a.Dossier).Where(a => a.OJID == id.GetValueOrDefault());
            if (tmp == null)
            {
                return NotFound();
            }

            return View(tmp);
        }

        public IActionResult DelDoc(int? id)
        {

            if(id == null)
            {
                return NotFound();
            }
            var tmp = db.DocInOJ.FirstOrDefault(a => a.ID == id.GetValueOrDefault());
            if (tmp == null)
            {
                return NotFound();
            }


            db.DocInOJ.Remove(tmp);
            db.SaveChanges();

            return RedirectToAction("Doc", new { id = tmp.OJID });
        }

        public IActionResult EditDoc(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }
            var tmp = db.DocInOJ.FirstOrDefault(a => a.ID == id.GetValueOrDefault());
            if (tmp == null)
            {
                return NotFound();
            }

            return View(tmp);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditDoc([Bind("ID,OJID,DossierID,Date")] DocInOJ doc)
        {
            if(ModelState.IsValid)
            {
                db.Update(doc);
                await db.SaveChangesAsync();
                return RedirectToAction("Doc", new { id = doc.OJID });
            }
            return View(doc);
        }

        public IActionResult Membre(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var tmp = db.Invite.Where(a => a.OJID == id.GetValueOrDefault());
            if (tmp == null)
            {
                return NotFound();
            }

            return View(tmp);
        }


        public IActionResult DelMembre(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }
            var tmp = db.Invite.FirstOrDefault(a => a.ID == id.GetValueOrDefault());
            if (tmp == null)
            {
                return NotFound();
            }


            db.Invite.Remove(tmp);
            db.SaveChanges();

            return RedirectToAction("Membre", new { id = tmp.OJID });
        }


        public IActionResult Generate(int? id)
        {
            //if (id == null)
            //{
            //    return NotFound();
            //}

            ////var tmp = await db.OJ.Include(a => a.Commission).FirstOrDefaultAsync(a => a.ID == id.GetValueOrDefault());

            //if (tmp == null)
            //{
            //    return NotFound();
            //}

            //OJViewGenerate re = new OJViewGenerate { OJ = tmp };
            //re.Doc = db.DocInOJ.Include(d => d.Dossier).Where(a => a.OJID == tmp.ID).ToList();
            //re.Inv = db.Invite.Include(d => d.GuestInAcheteur).Include(a => a.GuestInAcheteur.Acheteur)
            //                                                .Include(a => a.GuestInAcheteur.Guest)
            //                                                .Where(a => a.OJID == tmp.ID)
            //                                                .Select(a => a.GuestInAcheteur)
            //                                                .ToList<GuestInAcheteur>();
            //re.Membre = db.Member.Include(a => a.Guest).Where(a => a.CommissionID == tmp.CommissionID).ToList();

            ////ViewBag.Membre = JsonConvert.SerializeObject(re.Membre);
            ////ViewBag.OJ = JsonConvert.SerializeObject(re.OJ);
            //ViewBag.Invite = JsonConvert.SerializeObject(re.Inv);
            return View();
        }


        #region helper
        private async Task<string> Upload(IFormFile Location,string Folder,string ext)
        {
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, Folder), Guid.NewGuid().ToString() + ext);
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Location.CopyToAsync(fileStream);
                }
                return Path.GetFileName(filePath);
            }
            catch (Exception)
            {
                return "";
            }
        }

        private int Commission()
        {
            string Id = ViewBag.user.Id;
            try
            {
                return db.UserAgent.Include(a => a.Agent).Where(a => a.UserID == Id).Select(a => a.Agent.CommissionID).FirstOrDefault();
            }
            catch (Exception) { }

            return 0;

        }


        private OJ Generate()
        {
            int com = Commission();
            var num = db.OJ.Where(a => a.CommissionID == com).Max(a => a.Num) + 1;
            var year = DateTime.Now.Year;
            OJ re = new OJ { Num = num, Year = year, CommissionID = com };
            return re;
        }
        #endregion
    }
}
