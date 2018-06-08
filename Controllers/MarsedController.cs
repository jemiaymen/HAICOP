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
    [Authorize(Roles = "root,Admin,President,assistant,Chef,Rapporteur")]
    public class MarsedController : BaseCtrl
    {

        private readonly ILogger _logger;
        public MarsedController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext db, ILoggerFactory loggerFactory) :
                                base(userManager, signInManager, db)
        {
            _logger = loggerFactory.CreateLogger<MarsedController>();
        }

        public async Task<IActionResult> AffectAdd(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doc = await db.AchInDossier.Include(d => d.Dossier).Include(a => a.Acheteur).FirstOrDefaultAsync(a => a.DossierID == id.GetValueOrDefault());

            if (doc == null)
            {
                return NotFound();
            }

            ViewBag.Menu = "اضافة بطاقة اسناد صفقة";

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            AffectView affect = new AffectView();
            affect.InitFromDoc(doc.Dossier);

            return View(affect);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AffectAdd(AffectView model, int DossierID,
                                                   [Bind("AcheteurID,Tel,Fax,Email,FirstLastName")] AcheteurDetail ach ,
                                                   [Bind("FournisseurID,Nationalite,Activity,Speciality,Category")] FournisseurDetail four)
        {

            ModelState.Remove("Tel");
            ModelState.Remove("Nationalite");
            ModelState.Remove("Activity");

            if (ModelState.IsValid)
            {
                var doc = db.Dossier.FirstOrDefault(a => a.ID == DossierID);


                if(doc == null)
                {
                    return NotFound();
                }

                db.FournisseurDetail.Add(four);
                db.AcheteurDetail.Add(ach);
                await db.SaveChangesAsync();

                AffectTrend affect = new AffectTrend { DossierID = doc.ID , FournisseurDetailID = four.ID, AcheteurDetailID = ach.ID, Subject = model.Subject , TotalLocal = model.TotalLocal , Financement = model.Financement , Foreing = model.Foreing };
                db.AffectTrend.Add(affect);
                await db.SaveChangesAsync();

                db.DossierDetail.Add(new DossierDetail { AffectTrendID = affect.ID, IsSmall = model.IsSmall, NbrLot = model.NbrLot });
                db.DossierDelais.Add(new DossierDelais { AffectTrendID = affect.ID, DateAnConc = model.DateAnConc, DateAvis = model.DateAvis, DelaiTraveau = model.DelaiTraveau, DateDebu = model.DateDebu, DatePro = model.DatePro, DateTraveau = model.DateTraveau, DateOpen = model.DateOpen, DateLastChanceAccept = model.DateLastChanceAccept });
                db.Concurrence.Add(new Concurrence { AffectTrendID = affect.ID, NbrChaier = model.NbrChaier, NbrOffre = model.NbrOffre, NbrOffreFinance = model.NbrOffreFinance, NbrSuppBeforeFinance = model.NbrSuppBeforeFinance });
                db.InfoValeur.Add(new InfoValeur { AffectTrendID = affect.ID, Description = model.Description, MethodPrice = model.MethodPrice, NaturePrice = model.NaturePrice, NbrFinance = model.NbrFinance, NbrTech = model.NbrTech, TotalEstimation = model.TotalEstimation, Valeur = model.Valeur });
                db.Moinsdis.Add(new Moinsdis { AffectTrendID = affect.ID, Critere = model.Critere, NbrConform = model.NbrConform });
                db.Balance.Add(new Balance { AffectTrendID = affect.ID, CritereComplex = model.CritereComplex, CritereImportance = model.CritereImportance });

                await db.SaveChangesAsync();

                return RedirectToAction("Select", "Doc", new { id = DossierID });
            }

            ViewBag.Menu = "اضافة بطاقة اسناد صفقة";

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            return View(model);
        }

        public IActionResult AffectEdit(int? id)
        {
            ViewBag.Menu = "تحيين بطاقة اسناد صفقة";

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            AffectTrend affect = db.AffectTrend.Include(a => a.AcheteurDetail)
                                               .Include(a => a.FournisseurDetail)
                                               .Include(a => a.Balance)
                                               .Include(a => a.Concurrence)
                                               .Include(a => a.Dossier)
                                               .Include(a => a.DossierDelais)
                                               .Include(a => a.DossierDetail)
                                               .Include(a => a.InfoValeur)
                                               .Include(a => a.Moinsdis)
                                               .FirstOrDefault(a => a.ID == id.GetValueOrDefault());

            if(affect == null)
            {
                return NotFound();
            }

            AffectView view = new AffectView();

            try
            {
                view.Init(affect);

                return View(view);
            }
            catch (Exception)
            {
                return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
            }


        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AffectEdit(AffectView model)
        {

            ModelState.Remove("Tel");
            ModelState.Remove("Nationalite");
            ModelState.Remove("Activity");

            if (ModelState.IsValid)
            {
                AffectTrend affect = db.AffectTrend.Include(a => a.AcheteurDetail)
                                               .Include(a => a.FournisseurDetail)
                                               .Include(a => a.Balance)
                                               .Include(a => a.Concurrence)
                                               .Include(a => a.Dossier)
                                               .Include(a => a.DossierDelais)
                                               .Include(a => a.DossierDetail)
                                               .Include(a => a.InfoValeur)
                                               .Include(a => a.Moinsdis)
                                               .FirstOrDefault(a => a.ID == model.ID);
                
                if(affect == null)
                {
                    return NotFound();
                }

                affect.Subject = model.Subject;
                affect.Financement = model.Financement;
                affect.Dossier.Mode = model.Mode;
                affect.TotalLocal = model.TotalLocal;
                affect.Foreing = model.Foreing;

                if(affect.FournisseurDetail.FournisseurID != model.FournisseurID)
                {
                    affect.FournisseurDetail.FournisseurID = model.FournisseurID;
                }

                affect.FournisseurDetail.Activity = model.Activity;
                affect.FournisseurDetail.Category = model.Category;
                affect.FournisseurDetail.Nationalite = model.Nationalite;
                affect.FournisseurDetail.Speciality = model.Speciality;


                if(affect.AcheteurDetail.AcheteurID != model.AcheteurID)
                {
                    affect.AcheteurDetail.AcheteurID = model.AcheteurID;
                }

                affect.AcheteurDetail.Email = model.Email;
                affect.AcheteurDetail.Fax = model.Fax;
                affect.AcheteurDetail.Tel = model.Tel;
                affect.AcheteurDetail.FirstLastName = model.FirstLastName;

                affect.DossierDetail.IsSmall = model.IsSmall;
                affect.DossierDetail.NbrLot = model.NbrLot;

                affect.InfoValeur.Description = model.Description;
                affect.InfoValeur.MethodPrice = model.MethodPrice;
                affect.InfoValeur.NaturePrice = model.NaturePrice;
                affect.InfoValeur.NbrFinance = model.NbrFinance;
                affect.InfoValeur.NbrTech = model.NbrTech;
                affect.InfoValeur.TotalEstimation = model.TotalEstimation;
                affect.InfoValeur.Valeur = model.Valeur;

                affect.DossierDelais.DateAnConc = model.DateAnConc;
                affect.DossierDelais.DateDebu = model.DateDebu;
                affect.DossierDelais.DateLastChanceAccept = model.DateLastChanceAccept;
                affect.DossierDelais.DateTraveau = model.DateTraveau;
                affect.DossierDelais.DateOpen = model.DateOpen;
                affect.DossierDelais.DelaiTraveau = model.DelaiTraveau;
                affect.DossierDelais.DatePro = model.DatePro;
                affect.DossierDelais.DateAvis = model.DateAvis;

                affect.Concurrence.NbrChaier = model.NbrChaier;
                affect.Concurrence.NbrOffre = model.NbrOffre;
                affect.Concurrence.NbrSuppBeforeFinance = model.NbrSuppBeforeFinance;
                affect.Concurrence.NbrOffreFinance = model.NbrOffreFinance;

                affect.Moinsdis.Critere = model.Critere;
                affect.Moinsdis.NbrConform = model.NbrConform;

                affect.Balance.CritereComplex = model.CritereComplex;
                affect.Balance.CritereImportance = model.CritereImportance;

                await db.SaveChangesAsync();

                return RedirectToAction("Select", "Doc", new { id = affect.DossierID });
            }

            ViewBag.Menu = "تحيين بطاقة اسناد صفقة";

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            return View(model);
        }




        public async Task<IActionResult> AddEstimation(int? id)
        {
            ViewBag.Menu = "إضافة تقديرات المشتري العمومي";

            if (id == null)
            {
                return NotFound();
            }

            var trend = await db.AffectTrend.FirstOrDefaultAsync(a => a.ID == id.GetValueOrDefault());

            if (trend == null)
            {
                return NotFound();
            }

            return View(new Estimation { AffectTrendID = trend.ID });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddEstimation([Bind("AffectTrendID,Lbl,Montant")] Estimation es)
        {
            ViewBag.Menu = "إضافة تقديرات المشتري العمومي";
            if (ModelState.IsValid)
            {
                await db.Estimation.AddAsync(es);
                await db.SaveChangesAsync();
                return RedirectToAction("Estimation", "Marsed", new { id = es.AffectTrendID });
            }
            return View(es);
        }

        public IActionResult Estimation(int? id)
        {
            ViewBag.Menu = "القائمة الجملية لتقديرات المشتري العمومي";

            if (id == null)
            {
                return NotFound();
            }

            var re = db.Estimation.Include(a => a.AffectTrend).Include(a => a.AffectTrend.Dossier).Where(a => a.AffectTrendID == id.GetValueOrDefault());

            if (re.FirstOrDefault() == null)
            {
                return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
            }

            return View(re);
        }


        public IActionResult EditEstimation(int? id)
        {
            ViewBag.Menu = "تحيين تقديرات المشتري العمومي";
            if (id == null)
            {
                return NotFound();
            }

            var tmp = db.Estimation.FirstOrDefault(f => f.ID == id.GetValueOrDefault());

            if (tmp == null)
            {
                return NotFound();
            }

            return View(tmp);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditEstimation([Bind("ID,AffectTrendID,Lbl,Montant")] Estimation es)
        {
            ViewBag.Menu = "تحيين تقديرات المشتري العمومي";
            if (ModelState.IsValid)
            {
                db.Estimation.Update(es);
                await db.SaveChangesAsync();
                return RedirectToAction("Estimation", "Marsed", new { id = es.AffectTrendID });
            }

            return View(es);
        }



        public IActionResult SuivieAdd(int? id)
        {
            ViewBag.Menu = "اضافة بطاقة متابعة إنجاز صفقة";

            if (id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.SingleOrDefault(a => a.ID == id.GetValueOrDefault());

            if (doc == null)
            {
                return NotFound();
            }

            Suivie s = new Suivie { DossierID = doc.ID};
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(s);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SuivieAdd(Suivie model)
        {
            model.ID = 0;
            if(ModelState.IsValid)
            {
                db.Suivie.Add(model);
                await db.SaveChangesAsync();
                return RedirectToAction("Select", "Doc", new { id = model.DossierID });
            }

            ViewBag.Menu = "اضافة بطاقة متابعة إنجاز صفقة";
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(model);
        }


        public IActionResult Suivie(int? id)
        {
            ViewBag.Menu = "تحيين بطاقة متابعة إنجاز صفقة";

            var suiv = db.Suivie.Include(a => a.Fournisseur).Where(a => a.DossierID == id.GetValueOrDefault());

            if(suiv == null)
            {
                return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
            }

            return View(suiv);
        }

        public IActionResult SuivieEdit(int? id)
        {
            
            Suivie suiv = db.Suivie.SingleOrDefault(a => a.ID == id.GetValueOrDefault());
            if(suiv == null)
            {
                return NotFound();
            }

            ViewBag.Menu = "تحيين بطاقة متابعة إنجاز صفقة";
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(suiv);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SuivieEdit(Suivie suiv)
        {
            if(ModelState.IsValid)
            {
                db.Suivie.Update(suiv);
                await db.SaveChangesAsync();
                return RedirectToAction("Suivie", "Marsed", new { id = suiv.DossierID });

            }

            ViewBag.Menu = "تحيين بطاقة متابعة إنجاز صفقة";
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(suiv);
        }

    }
}