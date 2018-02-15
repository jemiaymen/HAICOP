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

namespace HAICOP.Controllers
{
    [Authorize(Roles ="root,Admin,President,Chef,assistant")]
    public class AvisController : BaseCtrl
    {
        private IHostingEnvironment _environment;
        private ILogger _logger;

        public AvisController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,
                            IHostingEnvironment environment , ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db)
        {
            _environment = environment;
            _logger = loggerFactory.CreateLogger<AvisController>();
    
        }

        #region update style

        

        [Authorize(Roles ="root,Admin,President,Chef")]
        public async Task<IActionResult> Index()
        {
            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");


            if(ischef)
            {
                string id = ViewBag.user.Id;

                var comm = db.UserAgent.Include(a => a.Agent)
                                       .First( a => a.UserID == id && a.Agent.IsPresident == true );

                var ret = await db.Dossier.Include(d => d.Commission)
                                         .Include( d => d.Mails)
                                         .Where( d => d.State != DossierState.Accept && 
                                                      d.State != DossierState.Refus && 
                                                      d.CommissionID == comm.Agent.CommissionID )
                                         .ToListAsync();

                return View(ret) ;

            }
            
            var re = await db.Dossier.Include(d => d.Commission)
                                     .Include( d => d.Mails)
                                     .Where( d => d.State != DossierState.Accept && d.State != DossierState.Refus )
                                     .ToListAsync();

            
            return View(re);

            
        }

        [Authorize(Roles ="root,Admin,President")]
        public IActionResult Accept(int? id)
        {
            ViewBag.Menu = "قبول الملف";
            if (id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.Include( d => d.Commission)
                                      .FirstOrDefault(d => d.ID == id.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            return View(doc);

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President")]
        public async Task<IActionResult> Accept(int ID,decimal Num)
        {
            ViewBag.Menu = "قبول الملف";
            if (ModelState.IsValid)
            {
                var doc = db.Dossier.FirstOrDefault(d => d.ID == ID && d.Num == Num);

                if(doc != null)
                {
                    try
                    {
                        doc.State = DossierState.Accept;
                        db.Update(doc);
                        await db.SaveChangesAsync();

                         _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Accept DossierID : {ID} .");
                        return RedirectToAction("Select","Doc" , new { id = ID });
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogError(3,ex.Message);
                        throw;
                    }

                    
                }
            }
            return Accept(ID);
        }

        [Authorize(Roles ="root,Admin,President")]
        public IActionResult Ref(int? id)
        {
            ViewBag.Menu = "رفض الملف";
            if (id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.Include( d => d.Commission)
                                      .FirstOrDefault(d => d.ID == id.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            return View(doc);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President")]
        public async Task<IActionResult> Ref(int ID,decimal Num)
        {
            ViewBag.Menu = "رفض الملف";
            if (ModelState.IsValid)
            {
                var doc = db.Dossier.FirstOrDefault(d => d.ID == ID && d.Num == Num);

                if(doc != null)
                {
                    try
                    {
                        doc.State = DossierState.Refus;
                        db.Update(doc);
                        await db.SaveChangesAsync();
                        _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Deny DossierID : {ID} .");
                        return RedirectToAction("Select", "Doc", new { id = ID });
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogError(3,ex.Message);
                        throw;
                    }

                    
                }
            }
            return Ref(ID);
        }


        [Authorize(Roles ="root,Admin,President,assistant")]
        public IActionResult EditFour(int? fid , int? did)
        {
            ViewBag.Menu = "تحيين صاحب الصفقة";
            if ( fid ==  null || did == null)
            {
                return NotFound();
            }

            var four = db.FourInDossier.Include( f => f.Fournisseur)
                                             .Include(f => f.Dossier)
                                             .SingleOrDefault( f => f.DossierID == did.GetValueOrDefault() && f.FournisseurID == fid);
            if( four == null)
            {
                return NotFound();
            }

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");  

            var model = new AddFour();
            model.InitFromFinD(four);
            model.tmpFournisseurID = model.FournisseurID;

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President,assistant")]
        public async Task<IActionResult> EditFour(int DossierID,int tmpFournisseurID,[Bind("DossierID,FournisseurID,Lbl,Montant,Foreign,Done,MettingDate")] FourInDossier four )
        {
            ViewBag.Menu = "تحيين صاحب الصفقة";
            if (ModelState.IsValid)
            {

                try
                {
                    if(tmpFournisseurID != four.FournisseurID)
                    {
                        db.Remove( db.FourInDossier.AsNoTracking().SingleOrDefault( f => f.DossierID == DossierID && f.FournisseurID == tmpFournisseurID ));
                        db.Add(four);
                        await db.SaveChangesAsync();
                    }
                    else 
                    {
                        db.Update(four);
                        await db.SaveChangesAsync();
                    }

                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Fournisseur DossierID : {DossierID} FournisseurID : {tmpFournisseurID} .");
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(3,ex.Message);
                    throw;
                }

                return RedirectToAction("Select","Doc", new { id = DossierID });
            }

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");  

            var model = new AddFour();
            model.InitFromFinD(four);

            return View(model);
        }



        [Authorize(Roles ="root,Admin,President,assistant")]
        public IActionResult AddFour(int? id)
        {
            ViewBag.Menu = "إضافة صاحب الصفقة";
            if (id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");  
            return View( new AddFour { DossierID = id.GetValueOrDefault() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President,assistant")]
        public async Task<IActionResult> AddFour(int DossierID,[Bind("DossierID,FournisseurID,Lbl,Montant,Foreign")] FourInDossier four  )
        {
            ViewBag.Menu = "إضافة صاحب الصفقة";
            if (!DossierExists(DossierID) )
            {
                return NotFound();
            }

            if(ModelState.IsValid)
            {
                try
                {
                    db.Add(four);
                    await db.SaveChangesAsync();

                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Fournisseur DossierID : {DossierID} FournisseurID : {four.FournisseurID} .");
                    return RedirectToAction("AddFour",new {id = DossierID});
                }
                catch (Exception ex)
                {
                    _logger.LogError(3,ex.Message);
                    throw;
                }
                
            }

            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl"); 
            var err = new AddFour();
            err.InitFromFinD(four);
            return View(err);
        }

        [Authorize(Roles ="root,Admin,President,assistant")]
        public IActionResult Rep(int? id)
        {
            ViewBag.Menu = "إضافة قرار";
            if (id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            ViewData["DessisionID"] = new SelectList(db.Dessision, "ID", "Lbl");  
            return View( new AddAvis { DossierID = id.GetValueOrDefault() , MettNbr = 1  });

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President,assistant")]
        public async Task<IActionResult> Rep(int DessisionID ,int DossierID,[Bind("DossierID,MettDate,NotifDate,MettNbr,MettDesc")] Metting metting , IFormFile Location, [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail  )
        {
            ViewBag.Menu = "إضافة قرار";
            if (!DossierExists( DossierID))
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if(Location != null)
                    {
                        mail.Url = Upload(Location).Result;
                    }
                    
                    if(mail.Url == "")
                    {
                        AddAvis model = new AddAvis();
                        model.InitFromMail(mail);
                        model.InitFromMetting(metting);
                        ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
                        return View(model);
                    }

                    db.Add(metting);
                    await db.SaveChangesAsync();
                    mail.MettingID = metting.ID;
                    db.Add(mail);
                    
                    db.Add(new DessisionInMetting { DessisionID = DessisionID , Metting = metting});
                    var doc = await db.Dossier.FindAsync(DossierID);
                    doc.State = DossierState.Traitement;
                    doc.TraitDate = metting.MettDate;
                    db.Update(doc);
                    await db.SaveChangesAsync();

                    var four = db.FourInDossier.Where(d => d.DossierID == DossierID && d.Done == false);

                    foreach(var f in four)
                    {
                        f.Done = true;
                        f.MettingDate = metting.MettDate;
                    }

                    db.UpdateRange(four);
                    await db.SaveChangesAsync();

                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Response DossierID : {DossierID} MettingID : {metting.ID} .");

                    return RedirectToAction("Select","Doc", new {id = DossierID});
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
            }
            ViewData["DessisionID"] = new SelectList(db.Dessision, "ID", "Lbl");
            AddAvis m = new AddAvis();
            m.InitFromMail(mail);
            m.InitFromMetting(metting);
            return View(m);
        }


        public IActionResult EditAvis(int? id)
        {
            ViewBag.Menu = "تحيين قرار";
            if (id == null)
            {
                return NotFound();
            }


            var metting = db.DessisionInMetting.Include(m => m.Metting)
                                               .Include(d => d.Dessision)
                                               .FirstOrDefault(m => m.MettingID == id.GetValueOrDefault());
            if(metting == null)
            {
                return NotFound();
            }

            

            EditAvis model = new EditAvis();

            var mail = db.Mail.FirstOrDefault(a => a.MettingID == id.GetValueOrDefault());

            model.InitFromMail(mail);
            model.InitFromMetting(metting.Metting);

            model.MailID = mail.ID;
            model.MettingID = metting.MettingID;
            model.DessisionID = metting.DessisionID;
            model.Url = mail.Url;

            ViewData["DessisionID"] = new SelectList(db.Dessision, "ID", "Lbl");  
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,President,assistant")]
        public async Task<IActionResult> EditAvis(int MailID,int MettingID,int DessisionID,int DossierID, IFormFile Location,[Bind("DossierID,MettDate,NotifDate,MettNbr,MettDesc")] Metting metting ,  [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc,MettingID,Url")] Mail mail )
        {
            ViewBag.Menu = "تحيين قرار";
            ModelState.Remove("Url");
            if (ModelState.IsValid)
            {

                mail.ID = MailID;
                metting.ID = MettingID;
                //mail.Url = Url;


                if(Location != null)
                {
                    if(mail.Url != null)
                    {
                        Del(mail.Url);
                    }
                    mail.Url = await Upload(Location);
                }

                db.Update(mail);
                await db.SaveChangesAsync();
                try
                {
                    db.Update(metting);
                    db.Remove( await db.DessisionInMetting.AsNoTracking().SingleOrDefaultAsync(s => s.MettingID == MettingID));
                    await db.SaveChangesAsync();
                    var dinm = new DessisionInMetting { DessisionID = DessisionID , MettingID = MettingID};
                    db.Add(dinm);
                    var doc = await db.Dossier.FindAsync(DossierID);
                    doc.State = DossierState.Traitement;
                    doc.TraitDate = metting.MettDate;
                    db.Update(doc);
                    await db.SaveChangesAsync();

                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} EditAvis DossierID : {DossierID} MettingID : {metting.ID} .");
                }
                catch (Exception ex)
                {
                    _logger.LogError(3, ex.Message);
                    throw;
                }

                return RedirectToAction("Select","Doc", new {id = DossierID});
            }
            
            EditAvis m = new EditAvis();
            m.InitFromMail(mail);
            m.InitFromMetting(metting);

            m.MailID = mail.ID;
            m.MettingID = metting.ID;
            m.DessisionID = DessisionID;

            ViewData["DessisionID"] = new SelectList(db.Dessision, "ID", "Lbl");  
            return View(m);
        }

        private bool DossierExists(int id)
        {
            return db.Dossier.Any(e => e.ID == id);
        }

        private async Task<string> Upload(IFormFile Location)
        {
            var fileExt = System.IO.Path.GetExtension(Location.FileName);

            if(fileExt != ".pdf")
            {
                return "";
            }
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), Guid.NewGuid().ToString() + fileExt) ;
            try 
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Location.CopyToAsync(fileStream);
                }
                return Path.GetFileName(filePath);
            }
            catch(Exception )
            {
                return "";
            }    
        }


        private bool Del(string url)
        {
            try
            {
                var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), url);
                _logger.LogInformation(3, filePath);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    _logger.LogInformation(3, "del file");
                    return true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex.Message);
            }
            return false;
        }

        #endregion
    }
}