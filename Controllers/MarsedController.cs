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
    [Authorize(Roles = "root,Admin,assistant,Chef,Rapporteur")]
    public class MarsedController : BaseCtrl
    {

        private readonly ILogger _logger;
        public MarsedController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext db, ILoggerFactory loggerFactory) :
                                base(userManager, signInManager, db)
        {
            _logger = loggerFactory.CreateLogger<MarsedController>();
        }

        public async Task<IActionResult> Info(int? id)
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

            ViewData["AcheteurID"] = new SelectList(db.AcheteurDetail, "ID", "FirstLastName");

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            AffectView affect = new AffectView();
            affect.InitFromDoc(doc);

            return View(affect);
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Info(InfoView info, int DossierID, DossierType Type, decimal TotalLocal, Financement Financement,
        //                                      ModePassation Mode, int AcheteurID,
        //                                      [Bind("DossierID,FournisseurID")] FourInDossier FourInDossier,
        //                                      [Bind("DossierID", "IsSmall", "NbrLot")] DossierDetail dsd,
        //                                      [Bind("DossierID", "DateAnConc", "DateLastChanceAccept", "DateOpen", "DatePro", "DateAvis", "DateDebu", "DateTraveau", "DelaiTraveau")] DossierDelais dsdelais,
        //                                      [Bind("DossierID", "NbrChaier", "NbrOffre", "NbrSuppBeforeFinance", "NbrOffreFinance")] Concurrence crc,
        //                                      [Bind("DossierID", "Valeur", "NbrTech", "NbrFinance", "NaturePrice", "MethodPrice", "TotalEstimation", "Description")] InfoValeur inf,
        //                                      [Bind("DossierID", "Lbl", "Montant")] Estimation est,
        //                                      [Bind("DossierID", "Critere", "NbrConform")] Moinsdis moin,
        //                                      [Bind("DossierID", "CritereComplex", "CritereImportance")] Balance bal)
        //{
        //    ModelState.Remove("Tel");
        //    ModelState.Remove("Fax");
        //    ModelState.Remove("FirstLastName");
        //    ModelState.Remove("Email");

        //    if (ModelState.IsValid)
        //    {
        //        var doc = db.Dossier.FirstOrDefault(a => a.ID == DossierID);

        //        doc.Type = Type;
        //        doc.TotalLocal = TotalLocal;
        //        doc.Financement = Financement;
        //        doc.Mode = Mode;

        //        FourInDossier.Montant = TotalLocal;
        //        dsd.AcheteurDetailID = AcheteurID;

        //        db.FourInDossier.Add(FourInDossier);
        //        db.DossierDetail.Add(dsd);
        //        db.InfoValeur.Add(inf);
        //        db.DossierDelais.Add(dsdelais);
        //        db.Concurrence.Add(crc);
        //        db.Estimation.Add(est);
        //        db.Moinsdis.Add(moin);
        //        db.Balance.Add(bal);
        //        await db.SaveChangesAsync();

        //        return RedirectToAction("Select", "Doc", new { id = DossierID });
        //    }

        //    ViewBag.Menu = "اضافة بطاقة اسناد صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.AcheteurDetail, "ID", "FirstLastName");

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    return View(info);
        //}

        //public IActionResult EditInfo(int? id)
        //{
        //    ViewBag.Menu = "تحيين بطاقة اسناد صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.AcheteurDetail, "ID", "FirstLastName");

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    try
        //    {
        //        var doc = db.AchInDossier.Include(d => d.Dossier).Include(d => d.Acheteur).FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var docdel = db.DossierDelais.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var docdelai = db.DossierDetail.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var conc = db.Concurrence.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var inf = db.InfoValeur.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var moin = db.Moinsdis.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var bal = db.Balance.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());

        //        var foun = db.FourInDossier.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var detailfour = db.FournisseurDetail.FirstOrDefault(a => a.FournisseurID == foun.FournisseurID);


        //        InfoView info = new InfoView();
        //        info.InitFromDoc(doc);
        //        info.InitBalance(bal);
        //        info.InitConcu(conc);
        //        info.InitDocDelai(docdel);
        //        info.InitDocDetail(docdelai);
        //        info.InitInfo(inf);
        //        info.InitMoinDis(moin);
        //        info.InitFromFour(detailfour);

        //        return View(info);
        //    }
        //    catch(Exception)
        //    {
        //        return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
        //    }


        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> EditInfo(InfoView info)
        //{
        //    ModelState.Remove("Tel");
        //    ModelState.Remove("Fax");
        //    ModelState.Remove("FirstLastName");
        //    ModelState.Remove("Email");

        //    if (ModelState.IsValid)
        //    {
        //        var doc = db.Dossier.FirstOrDefault(a => a.ID == info.DossierID);

        //        doc.Type = info.Type;
        //        doc.TotalLocal = info.TotalLocal;
        //        doc.Financement = info.Financement;
        //        doc.Mode = info.Mode;

        //        var four = db.FourInDossier.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        four.Montant = info.TotalLocal;

        //        var docdetail = db.DossierDetail.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        docdetail.AcheteurDetailID = info.AcheteurID;
        //        docdetail.IsSmall = info.IsSmall;
        //        docdetail.NbrLot = info.NbrLot;

        //        var inf = db.InfoValeur.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        inf.Description = info.Description;
        //        inf.MethodPrice = info.MethodPrice;
        //        inf.NaturePrice = info.NaturePrice;
        //        inf.NbrFinance = info.NbrFinance;
        //        inf.NbrTech = info.NbrTech;
        //        inf.TotalEstimation = info.TotalEstimation;
        //        inf.Valeur = info.Valeur;

        //        var delais = db.DossierDelais.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        delais.DateAnConc = info.DateAnConc;
        //        delais.DateDebu = info.DateDebu;
        //        delais.DateLastChanceAccept = info.DateLastChanceAccept;
        //        delais.DateTraveau = info.DateTraveau;
        //        delais.DateOpen = info.DateOpen;
        //        delais.DelaiTraveau = info.DelaiTraveau;
        //        delais.DatePro = info.DatePro;
        //        delais.DateAvis = info.DateAvis;

        //        var crc = db.Concurrence.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        crc.NbrChaier = info.NbrChaier;
        //        crc.NbrOffre = info.NbrOffre;
        //        crc.NbrSuppBeforeFinance = info.NbrSuppBeforeFinance;
        //        crc.NbrOffreFinance = info.NbrOffreFinance;

        //        var moin = db.Moinsdis.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        moin.Critere = info.Critere;
        //        moin.NbrConform = info.NbrConform;

        //        var bal = db.Balance.FirstOrDefault(a => a.DossierID == info.DossierID);
        //        bal.CritereComplex = info.CritereComplex;
        //        bal.CritereImportance = info.CritereImportance;

        //        await db.SaveChangesAsync();

        //        return RedirectToAction("Select", "Doc", new { id = info.DossierID });
        //    }

        //    ViewBag.Menu = "تحيين بطاقة اسناد صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.AcheteurDetail, "ID", "FirstLastName");

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    return View(info);
        //}


        //[HttpPost]
        //public dynamic Ach(int? id)
        //{
        //    if (id == null)
        //    {
        //        return null;
        //    }
        //    return db.FournisseurDetail.FirstOrDefault(a => a.FournisseurID == id.GetValueOrDefault());
        //}

        //public IActionResult AchDetail()
        //{
        //    ViewBag.Menu = "معلومات حول المشتري العمومي";
        //    return View(db.AcheteurDetail.Include(a => a.Acheteur));
        //}

        //public IActionResult AddDetail()
        //{
        //    ViewBag.Menu = "إضافة معلومات للمشتري العمومي";
        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> AddDetail([Bind("AcheteurID,FirstLastName,Tel,Fax")] AcheteurDetail detail)
        //{
        //    ViewBag.Menu = "إضافة معلومات للمشتري العمومي";
        //    if (ModelState.IsValid)
        //    {
        //        db.AcheteurDetail.Add(detail);
        //        await db.SaveChangesAsync();

        //        return RedirectToAction("AchDetail", "Marsed");
        //    }

        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
        //    return View(detail);
        //}

        //public IActionResult EditDetail(int? id)
        //{
        //    ViewBag.Menu = "تحيين معلومات المشتري العمومي";
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var tmp = db.AcheteurDetail.FirstOrDefault(a => a.ID == id.GetValueOrDefault());

        //    if (tmp == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", tmp.AcheteurID);
        //    return View(tmp);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> EditDetail([Bind("ID,AcheteurID,FirstLastName,Tel,Fax")] AcheteurDetail detail)
        //{
        //    ViewBag.Menu = "تحيين معلومات المشتري العمومي";
        //    if (ModelState.IsValid)
        //    {
        //        db.AcheteurDetail.Update(detail);
        //        await db.SaveChangesAsync();
        //        return RedirectToAction("AchDetail", "Marsed");
        //    }
        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", detail.AcheteurID);
        //    return View(detail);
        //}


        //public IActionResult FourDetail()
        //{
        //    ViewBag.Menu = "معلومات حول صاحب الصفقة";
        //    return View(db.FournisseurDetail.Include(f => f.Fournisseur));
        //}

        //public IActionResult AddFourDetail()
        //{
        //    ViewBag.Menu = "إضافة معلومات صاحب الصفقة ";
        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> AddFourDetail([Bind("FournisseurID,Activity,Category,Nationalite,Speciality")] FournisseurDetail detailFour)
        //{
        //    ViewBag.Menu = "إضافة معلومات صاحب الصفقة";
        //    if (ModelState.IsValid)
        //    {
        //        db.FournisseurDetail.Add(detailFour);
        //        await db.SaveChangesAsync();

        //        return RedirectToAction("FourDetail", "Marsed");
        //    }

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
        //    return View(detailFour);
        //}

        //public IActionResult EditFourDetail(int? id)
        //{
        //    ViewBag.Menu = "تحيين معلومات صاحب الصفقة";
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var tmp = db.FournisseurDetail.FirstOrDefault(f => f.ID == id.GetValueOrDefault());

        //    if (tmp == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl", tmp.FournisseurID);
        //    return View(tmp);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> EditFourDetail([Bind("ID,FournisseurID,Activity,Category,Nationalite,Speciality")] FournisseurDetail detailFour)
        //{
        //    ViewBag.Menu = "تحيين معلومات صاحب الصفقة";
        //    if (ModelState.IsValid)
        //    {
        //        db.FournisseurDetail.Update(detailFour);
        //        await db.SaveChangesAsync();
        //        return RedirectToAction("FourDetail", "Marsed");
        //    }
        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl", detailFour.FournisseurID);
        //    return View(detailFour);
        //}


        //public async Task<IActionResult> AddEstimation(int? id)
        //{
        //    ViewBag.Menu = "إضافة تقديرات المشتري العمومي";

        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var doc = await db.Dossier.FirstOrDefaultAsync(a => a.ID == id.GetValueOrDefault());

        //    if (doc == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(new Estimation { DossierID = id.GetValueOrDefault() });
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> AddEstimation([Bind("DossierID,Lbl,Montant")] Estimation es)
        //{
        //    ViewBag.Menu = "إضافة تقديرات المشتري العمومي";
        //    if (ModelState.IsValid)
        //    {
        //        await db.Estimation.AddAsync(es);
        //        await db.SaveChangesAsync();
        //        return RedirectToAction("Estimation", "Marsed", new { id = es.DossierID });
        //    }
        //    return View(es);
        //}


        //public IActionResult EditEstimation(int? id)
        //{
        //    ViewBag.Menu = "تحيين تقديرات المشتري العمومي";
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var tmp = db.Estimation.FirstOrDefault(f => f.ID == id.GetValueOrDefault());

        //    if (tmp == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(tmp);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> EditEstimation([Bind("ID,DossierID,Lbl,Montant")] Estimation es)
        //{
        //    ViewBag.Menu = "تحيين تقديرات المشتري العمومي";
        //    if (ModelState.IsValid)
        //    {
        //        db.Estimation.Update(es);
        //        await db.SaveChangesAsync();
        //        return RedirectToAction("Estimation", "Marsed", new { id = es.DossierID });
        //    }

        //    return View(es);
        //}



        //public IActionResult Estimation(int? id)
        //{
        //    ViewBag.Menu = "القائمة الجملية لتقديرات المشتري العمومي";

        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var re = db.Estimation.Include(a => a.Dossier).Where(a => a.DossierID == id.GetValueOrDefault());

        //    if (re.FirstOrDefault() == null)
        //    {
        //        return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
        //    }

        //    return View(re);
        //}


        //public IActionResult Suivie(int? id)
        //{
        //    ViewBag.Menu = "اضافة بطاقة متابعة إنجاز صفقة";

        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var re = db.AchInDossier.Include(d => d.Dossier).Include(d => d.Acheteur).FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());

        //    if (re == null)
        //    {
        //        return NotFound();
        //    }

        //    SuivieView r = new SuivieView();
        //    r.InitFromDoc(re);

        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    return View(r);
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Suivie(SuivieView model,[Bind ("DossierID", "NaturePrice", "ContractualTerm", "FinalGuaranteeP", "FinalGuaranteeM" , "TitleGuaranteeP" , "TitleGuaranteeM", "DateDebu" ,"DateTraveau" , "StatementReasonsDates" , 
        //                                                                "NombreJoursRetard" , "DateAdmissionProvisoire" , "DateAcceptationFinale" ,"MontantPenalitesRetard","MontantPenalitesFournisseur","EvaluationAcheteur","DateMotifsAnnulation","DeclarationMethodes","DateFichierJointFinal")] Suivie suivie)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var doc = db.Dossier.FirstOrDefault(a => a.ID == model.DossierID);

        //        doc.Subject = model.Subject;
        //        doc.TotalLocal = model.TotalLocal;
        //        doc.Financement = model.Financement;
        //        doc.Mode = model.Mode;

        //        var four = db.FourInDossier.Include(a => a.Fournisseur).FirstOrDefault(a => a.DossierID == model.DossierID);

        //        if(four == null)
        //        {
        //            four = new FourInDossier { DossierID = model.DossierID, FournisseurID = model.FournisseurID, Montant = model.TotalLocal };
        //            db.FourInDossier.Add(four);
        //        }
        //        else
        //        {
        //            four.Montant = model.TotalLocal;

        //            db.FourInDossier.Update(four);
        //        }


        //        db.Suivie.Add(suivie);
        //        await db.SaveChangesAsync();
        //        return RedirectToAction("Select", "Doc", new { id = model.DossierID });
        //    }

        //    ViewBag.Menu = "اضافة بطاقة متابعة إنجاز صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    return View(model);
        //}


        //public IActionResult EditSuivie(int? id)
        //{
        //    ViewBag.Menu = "تحيين بطاقة متابعة إنجاز صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    try
        //    {
        //        var suiv = db.Suivie.FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());
        //        var doc = db.AchInDossier.Include(a => a.Dossier).Include(a => a.Acheteur).FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());

        //        var four = db.FourInDossier.Include(a => a.Fournisseur).FirstOrDefault(a => a.DossierID == id.GetValueOrDefault());

        //        SuivieView model = new SuivieView();

        //        model.InitFromSuiv(suiv);
        //        model.InitFromDoc(doc);
        //        model.FournisseurID = four.FournisseurID;
        //        ViewBag.ID = model.ID;

        //        return View(model);
        //    }
        //    catch(Exception)
        //    {
        //        return RedirectToAction("Select", "Doc", new { id = id.GetValueOrDefault() });
        //    }


        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> EditSuivie(SuivieView model ,int ID, [Bind ("ID","DossierID", "NaturePrice", "ContractualTerm", "FinalGuaranteeP", "FinalGuaranteeM" , "TitleGuaranteeP" , "TitleGuaranteeM", "DateDebu" ,"DateTraveau" , "StatementReasonsDates" ,
        //                                                                "NombreJoursRetard" , "DateAdmissionProvisoire" , "DateAcceptationFinale" ,"MontantPenalitesRetard","MontantPenalitesFournisseur","EvaluationAcheteur","DateMotifsAnnulation","DeclarationMethodes","DateFichierJointFinal")] Suivie suivie)
        //{

        //    if (ModelState.IsValid)
        //    {
        //        var doc = db.Dossier.FirstOrDefault(a => a.ID == model.DossierID);

        //        doc.Subject = model.Subject;
        //        doc.TotalLocal = model.TotalLocal;
        //        doc.Financement = model.Financement;
        //        doc.Mode = model.Mode;
        //        doc.Foreign = model.Foreign;

        //        suivie.ID = ID;

        //        db.Suivie.Update(suivie);

        //        await db.SaveChangesAsync();

        //        return RedirectToAction("Select", "Doc", new { id = model.DossierID });
        //    }

        //    ViewBag.Menu = "تحيين بطاقة متابعة إنجاز صفقة";

        //    ViewData["AcheteurID"] = new SelectList(db.AcheteurDetail, "ID", "FirstLastName");

        //    ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

        //    return View(model);
        //}

    }
}