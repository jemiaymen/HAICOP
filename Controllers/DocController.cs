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
    [Authorize(Roles = "root,Admin,BOC,Chef,President")]
    public class DocController : BaseCtrl
    {

        private IHostingEnvironment _environment;
        private ILogger _logger;

        public DocController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                            IHostingEnvironment environment , ILoggerFactory loggerFactory ):
                            base(userManager,signInManager,db) 
        {
            _environment = environment;
            _logger = loggerFactory.CreateLogger<DocController>();
    
        }

        [Authorize(Roles = "root,Admin,BOC,Chef,President")]
        public async Task<IActionResult> Index()
        {
            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");




            if(ischef)
            {
                string id = ViewBag.user.Id;

                var comm = db.UserAgent.Include(a => a.Agent)
                                       .First( a => a.UserID == id && a.Agent.IsPresident == true );
                _logger.LogDebug(2,comm.Agent.CommissionID  +"");

                var ret = await db.Dossier.Include(d => d.Commission)
                                         .Include( d => d.Mails)
                                         .Where( d =>  d.CommissionID == comm.Agent.CommissionID && 
                                                      (d.State != DossierState.Accept && d.State != DossierState.Refus )  )
                                         .ToListAsync();
                ViewBag.ischef = true;
                return View(ret) ;

            }
            if(isboc)
            {
                
                string id = ViewBag.user.Id;

                var comm = db.UserCommission.Where( a => a.UserID == id )
                                            .Select(a => a.CommissionID).ToList();

                var ret = await db.Dossier.Include(d => d.Commission)
                                          .Include( d => d.Mails)
                                          .Where( d => comm.Contains(d.CommissionID) &&  d.State != DossierState.Accept && d.State != DossierState.Refus )
                                          .ToListAsync();
                ViewBag.isboc = true;
                return View(ret) ;

            }

            if(isadmin || ispresident || isroot) 
            {
                ViewBag.isadmin = true;

                var re = await db.Dossier.Include(d => d.Commission)
                                        .Include( d => d.Mails)
                                        .Where( d =>  d.State != DossierState.Accept && d.State != DossierState.Refus  )
                                        .ToListAsync();
                return View(re);
            }

            return View();
            
        }

        [Authorize(Roles = "root,Admin,BOC,Chef,President")]
        public async Task<IActionResult> All()
        {
            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");




            if(ischef)
            {
                string id = ViewBag.user.Id;

                var comm = db.UserAgent.Include(a => a.Agent)
                                       .First( a => a.UserID == id && a.Agent.IsPresident == true );
                _logger.LogDebug(2,comm.Agent.CommissionID  +"");

                var ret = await db.Dossier.Include(d => d.Commission)
                                         .Include( d => d.Mails)
                                         .Where( d =>  d.CommissionID == comm.Agent.CommissionID && 
                                                      (d.State != DossierState.Creation )  )
                                         .ToListAsync();
                ViewBag.ischef = true;
                return View(ret) ;

            }
            if(isboc)
            {
                
                string id = ViewBag.user.Id;

                var comm = db.UserCommission.Where( a => a.UserID == id )
                                            .Select(a => a.CommissionID).ToList();

                var ret = await db.Dossier.Include(d => d.Commission)
                                          .Include( d => d.Mails)
                                          .Where( d => comm.Contains(d.CommissionID) &&  d.State == DossierState.Creation  )
                                          .ToListAsync();
                ViewBag.isboc = true;
                return View(ret) ;

            }

            if(isadmin || ispresident || isroot) 
            {
                ViewBag.isadmin = true;

                var re = await db.Dossier.Include(d => d.Commission)
                                        .Include( d => d.Mails)
                                        .Where( d =>  d.State != DossierState.Creation )
                                        .ToListAsync();
                return View(re);
            }

            return View();
            
        }

        public async Task<IActionResult> Rep()
        {

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");



            if(ischef)
            {
                string id = ViewBag.user.Id;
                var comm = db.UserAgent.Include(a => a.Agent)
                                       .First( a => a.UserID == id && a.Agent.IsPresident == true );

                var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.State == DossierState.Traitement && d.CommissionID == comm.Agent.CommissionID);
                List<DocDetail> re = new List<DocDetail>();
                foreach( var item in doc)
                {
                    var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                    .Where( f => f.DossierID == item.ID)
                                                    .Select(f => f.Fournisseur)
                                                    .ToList();

                    var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                        .SingleOrDefault( a => a.DossierID == item.ID).Acheteur ;
                    
                    var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                        .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    
                    var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                                .Include( d => d.Metting)
                                                                .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;

                    re.Add(new DocDetail { Dossier = item , Fournisseurs = four, Acheteur = achteur , Rapporteur = rapporteur , Dessision = dessision });
                }

                ViewBag.ischef = true;                            
                return View(re);
            }

            if(isboc)
            {
                string id = ViewBag.user.Id;

                var comm = db.UserCommission.Where( a => a.UserID == id )
                                            .Select(a => a.CommissionID).ToList();

                var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.State == DossierState.Traitement && comm.Contains(d.CommissionID));

                List<DocDetail> re = new List<DocDetail>();
                foreach( var item in doc)
                {
                    var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                    .Where( f => f.DossierID == item.ID)
                                                    .Select(f => f.Fournisseur)
                                                    .ToList();

                    var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                        .SingleOrDefault( a => a.DossierID == item.ID).Acheteur ;
                    
                    var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                        .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    
                    var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                                .Include( d => d.Metting)
                                                                .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;

                    re.Add(new DocDetail { Dossier = item , Fournisseurs = four, Acheteur = achteur , Rapporteur = rapporteur , Dessision = dessision });
                }
                ViewBag.isboc = true;                            
                return View(re);
            }

            if(isadmin || ispresident || isroot)
            {
                var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.State == DossierState.Traitement );

                List<DocDetail> re = new List<DocDetail>();
                foreach( var item in doc)
                {
                    var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                    .Where( f => f.DossierID == item.ID)
                                                    .Select(f => f.Fournisseur)
                                                    .ToList();

                    var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                        .SingleOrDefault( a => a.DossierID == item.ID).Acheteur ;
                    
                    var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                        .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    
                    var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                                .Include( d => d.Metting)
                                                                .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;

                    re.Add(new DocDetail { Dossier = item , Fournisseurs = four, Acheteur = achteur , Rapporteur = rapporteur , Dessision = dessision });
                }
                ViewBag.isroot = true;                            
                return View(re);
            }

            
            return View();

            
        }

        [Authorize(Roles = "BOC,Admin,root")]
        public IActionResult New()
        {
            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where( a => a.UserID == id)
                                        .Select( a => a.Commission).ToList();
            if(comm == null)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl" );
            }
            else 
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl" );
            }                            
            
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" );

            NewDossier model = new NewDossier();
            model.Num = ViewBag.user.Num + 1;
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,BOC")]
        public async Task<IActionResult> New([Bind("ID,CommissionID,Subject,Num,Type,Nature,DocDate,EnterDate,ProDate,AcheteurID,FournisseurID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc,Location")] NewDossier dossier)
        {
            if( (dossier.DocDate > dossier.ProDate) || (dossier.DocDate > dossier.EnterDate) )
            {
                ModelState.AddModelError("DocDate", "يجب أن يكون تاريخ الملف أقل من تاريخ التعهد");
            }

            if(dossier.DocDate.DayOfWeek == DayOfWeek.Sunday || dossier.DocDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("DocDate","يجب أن يكون تاريخ الملف داخل أوقات العمل ");
            }

            if(dossier.ProDate.DayOfWeek == DayOfWeek.Sunday || dossier.ProDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("ProDate","يجب أن يكون تاريخ التعهد داخل أوقات العمل ");
            }

            if(dossier.EnterDate.DayOfWeek == DayOfWeek.Sunday || dossier.EnterDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("EnterDate","يجب أن يكون تاريخ قبول الملف داخل أوقات العمل ");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    string file = Upload(dossier.Location).Result;

                    if(file != "")
                    {
                        Dossier doc = new Dossier{ CommissionID = dossier.CommissionID , Subject = dossier.Subject ,
                                            Num = dossier.Num , Type = dossier.Type , Nature = dossier.Nature,
                                            DocDate = dossier.DocDate , EnterDate = dossier.EnterDate , ProDate = dossier.ProDate  };
                        db.Add(doc);
                        Mail mail = new Mail { Dossier = doc , Ref = dossier.Ref , OriginRef = dossier.OriginRef , From = dossier.From , 
                                                MailType = dossier.MailType , MailNature = dossier.MailNature , MailDate = dossier.MailDate ,
                                                Desc = dossier.Desc , Url = file};
                        
                        await db.SaveChangesAsync();
                        AchInDossier ach = new AchInDossier { Dossier = doc , AcheteurID = dossier.AcheteurID};
                        db.Add(ach);
                        db.Add(mail);
                        ViewBag.user.Num += 1;
                        db.Update(ViewBag.user);
                        await db.SaveChangesAsync();
                        _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Dossier : { doc.ID} .");
                        return RedirectToAction("All");
                    }
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(3, ex.Message);
                    throw;
                }

                
            }

            ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where( a => a.UserID == id)
                                        .Select( a => a.Commission).ToList();
            if(comm == null)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl" , dossier.CommissionID);
            }
            else 
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl" , dossier.CommissionID);
            }  

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" , dossier.AcheteurID);

            return View(dossier);
        }

        [Authorize(Roles ="root,Admin,Chef,President")]
        public IActionResult Rapp()
        {
            bool ischef = _userManager.IsInRoleAsync(ViewBag.user, "Chef").Result;
            bool isadmin =  _userManager.IsInRoleAsync(ViewBag.user , "Admin").Result;
            bool ispresident = _userManager.IsInRoleAsync(ViewBag.user , "President").Result;
            bool isroot = _userManager.IsInRoleAsync(ViewBag.user , "root").Result;

            string id = ViewBag.user.Id;


            if(ischef)
            {
                var comm = db.UserAgent.Include(a => a.Agent)
                                    .Include(a => a.Agent.Commission)
                                    .Where( a => a.UserID == id && a.Agent.IsPresident == true)
                                    .Select(a => a.Agent.Commission)
                                    .ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl" );
            }
            else if(isadmin || isroot || ispresident)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl" );
            }




            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" );
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles ="root,Admin,Chef,President")]
        public async Task<bool> Rapp([Bind("ID,CommissionID,AcheteurID,AgentID")] Rapp model)
        {
            try
            {
                Rapporteur rapporteur = new Rapporteur {AgentID = model.AgentID , DossierID = model.ID};
                db.Add(rapporteur);
                var dossier = await db.Dossier.SingleOrDefaultAsync(m => m.ID == model.ID);
                dossier.State = DossierState.Encour ;
                db.Update(dossier);
                await db.SaveChangesAsync();
                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Rapporteur  RapporteurID : { model.AgentID}  DossierID : {model.ID}.");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [Authorize(Roles = "root,Admin,Chef,President")]
        public async Task<IActionResult> EditRapp()
        {
            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");

            if(ischef)
            {
                string id = ViewBag.user.Id;
                var comm = db.UserAgent.Include(a => a.Agent)
                                       .First( a => a.UserID == id && a.Agent.IsPresident == true );
                return View(await db.Rapporteur.Include(d => d.Dossier).Include(a => a.Agent).Include(c => c.Dossier.Commission).Where(a => a.Dossier.CommissionID == comm.Agent.CommissionID).ToListAsync() );
            }
            else if(isadmin || ispresident || isroot)
            {
                return View(await db.Rapporteur.Include(d => d.Dossier).Include(a => a.Agent).Include(c => c.Dossier.Commission).ToListAsync() );
            }

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root,Admin,Chef,President")]
        public async Task<bool> EditRapp(int DossierID , int AgentID , int OldAgentID)
        {
             _logger.LogInformation(3, string.Format( " dossier id {0} oldagent id {1} agentid {2}", DossierID,OldAgentID,AgentID ) );
                try
                {
                    var rapp = await db.Rapporteur.SingleAsync(m => m.DossierID == DossierID && m.AgentID == OldAgentID);
                    db.Remove(rapp);
                    db.Add(new Rapporteur { AgentID = AgentID , DossierID = DossierID});
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Rapporteur  DossierID : {DossierID}.");
                    return true;
                }
                catch (Exception ex)
                { 
                    _logger.LogInformation(3, ex.Message);
                }

            return false;
            
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dossier =    await db.AchInDossier.Include( d => d.Dossier)
                                                        .Include( d => d.Acheteur)
                                                        .Include( c => c.Dossier.Commission)
                                                        .SingleOrDefaultAsync(m => m.DossierID == id);
            if (dossier == null)
            {
                return NotFound();
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" , dossier.AcheteurID);
            ViewData["OldAcheteurID"] = dossier.AcheteurID;


            string userid = ViewBag.user.Id;

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");
            


            if (isboc )
            {
                var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where( a => a.UserID == userid)
                                        .Select( a => a.Commission).ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.Dossier.CommissionID);
            }
            else if(ischef)
            {
                var comm = db.UserAgent.Include(a => a.Agent)
                                    .Include(a => a.Agent.Commission)
                                    .Where( a => a.UserID == userid && a.Agent.IsPresident == true)
                                    .Select(a => a.Agent.Commission)
                                    .ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.Dossier.CommissionID);
            }
            else if(isadmin || ispresident || isroot)
            {
              ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.Dossier.CommissionID);  
            }

            
            NewDossier doc = new NewDossier();
            doc.InitFromAchaInDossier(dossier);
            return View(doc);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id,int AcheteurID,int OldAcheteurID, [Bind("ID,CommissionID,Subject,Num,Type,Nature,DocDate,EnterDate,ProDate")] Dossier dossier )
        {
            if (id != dossier.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(dossier);

                    if(AcheteurID != OldAcheteurID)
                    {
                        var ach = await db.AchInDossier.SingleAsync(m => m.DossierID == dossier.ID && m.AcheteurID == OldAcheteurID);
                        db.Remove(ach);
                        db.Add(new AchInDossier { AcheteurID = AcheteurID  , DossierID = dossier.ID});

                        _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit DossierID : { id} .");
                    }

                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DossierExists(dossier.ID))
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
            
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" , AcheteurID);

            string userid = ViewBag.user.Id;

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user , "Admin");
            bool ispresident = await     _userManager.IsInRoleAsync(ViewBag.user , "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user , "root");
            
            if (isboc )
            {
                var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where( a => a.UserID == userid)
                                        .Select( a => a.Commission).ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if(ischef)
            {
                var comm = db.UserAgent.Include(a => a.Agent)
                                    .Include(a => a.Agent.Commission)
                                    .Where( a => a.UserID == userid && a.Agent.IsPresident == true)
                                    .Select(a => a.Agent.Commission)
                                    .ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if(isadmin || isroot || ispresident)
            {
              ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.CommissionID);  
            }

            NewDossier doc = new NewDossier();
            doc.InitFromDossier(dossier,AcheteurID);
            return View(doc);
        }

        public async Task<IActionResult> Mail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mails =  db.Mail.Include( d => d.Dossier)
                                            .Include( c => c.Dossier.Commission)
                                            .Where(m => m.DossierID == id);
            if (mails == null)
            {
                return NotFound();
            }

            
            return View(await mails.ToListAsync());
        }

        public IActionResult EditMail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mail = db.Mail.SingleOrDefault(m => m.ID == id);
            if (mail == null)
            {
                return NotFound();
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            return View(ma);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> EditMail(int id,IFormFile Location, [Bind("ID,DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail )
        {
            if (id != mail.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var tmpmail = db.Mail.AsNoTracking().SingleOrDefault(m => m.ID == id);
                    if(Location != null)
                    {
                         _logger.LogInformation(5, "houni location not null");
                        Del(tmpmail.Url) ;
                        mail.Url = Upload(Location).Result;

                    }
                    else
                    {
                        mail.Url = tmpmail.Url;
                    }
                    
                    db.Update(mail);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit MailID {mail.ID} DossierID : { mail.DossierID} .");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new {id = mail.DossierID});
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
            return View(ma);
        }
        
        public IActionResult AddMail(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            return View(new AddMail { DossierID = id.GetValueOrDefault() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMail(int id,IFormFile Location, [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail )
        {

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
                        AddMail model = new AddMail();
                        model.InitFromMail(mail);
                        ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
                        return View(model);
                    }
                    
                    db.Add(mail);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Mail : { mail.ID}  DossierID : {mail.DossierID}.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new {id = mail.DossierID});
            }

            AddMail ma = new AddMail();
            ma.InitFromMail(mail);
            return View(ma);
        }

        [Authorize(Roles = "root,Admin,President")]
        public IActionResult EditFina(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var finan = db.InvInDossier.Include(d => d.Dossier)
                                             .SingleOrDefault( e => e.DossierID == id);

            if(finan == null)
            {
                var doc = db.Dossier.FirstOrDefault( d => d.ID == id.GetValueOrDefault());
                return View(new AddFina {Financement = doc.Financement , DossierID = doc.ID  });
            }

            ViewData["ForeignInvestisseur"] = new SelectList(db.ForeignInvestisseur, "ID", "Name" );

            return View(new AddFina {Foreign = finan.Dossier.Foreign , Financement = finan.Dossier.Financement , DossierID = id.GetValueOrDefault() , ForeignInvestisseurID = finan.ForeignInvestisseurID});
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root,Admin,President")]
        public async Task<IActionResult> EditFina(string Foreign,int DossierID,Financement Financement,[Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            try
            {
                var inv = db.InvInDossier.AsNoTracking().FirstOrDefault(s => s.DossierID == DossierID);
                if(inv != null)
                {
                    db.Remove(inv);
                }
                return await AddFina(Foreign , Financement , indoc);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(3,ex.Message);
                return View(new AddFina {Foreign = Foreign , Financement = Financement , DossierID = indoc.DossierID , ForeignInvestisseurID = indoc.ForeignInvestisseurID});
            }

        }

        [Authorize(Roles = "root,Admin,President")]
        public IActionResult AddFina(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.FirstOrDefault( d => d.ID == id.GetValueOrDefault());

            if(doc.Financement == Financement.Foreign || doc.Financement == Financement.Local )
            {
                return RedirectToAction("Index");
            }

            return View(new AddFina { DossierID = id.GetValueOrDefault() });

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root,Admin,President")]
        public async Task<IActionResult> AddFina(string Foreign,Financement Financement,[Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            if (ModelState.IsValid)
            {
                try
                {
                   

                    if(indoc.ForeignInvestisseurID != 0)
                    {
                        try
                        {
                             db.Remove(db.InvInDossier.AsNoTracking().SingleOrDefault( e => e.DossierID == indoc.DossierID));
                        }
                        catch (Exception e ) 
                        { 
                             _logger.LogError(2 , e.Message);
                        }
                       
                        db.Add(indoc);
                    }
                    
                    var dossier = db.Dossier.SingleOrDefault(m => m.ID == indoc.DossierID );
                    dossier.Financement = Financement;
                    dossier.Foreign = Foreign;
                    db.Update(dossier);

                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Fina : { indoc.DossierID} .");

                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                }
            }
            return View(new AddFina {Foreign = Foreign , Financement = Financement , DossierID = indoc.DossierID , ForeignInvestisseurID = indoc.ForeignInvestisseurID});
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
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), url ) ; 
            _logger.LogInformation(3,filePath);

            if(System.IO.File.Exists(filePath)) 
            {
                System.IO.File.Delete(filePath);
                _logger.LogInformation(3, "del file");
                return true;
            }
            return false;
        }


        private void printError()
        {
            foreach (var pair in ModelState)
            {
                if (pair.Value.Errors.Count > 0)
                {
                    //errors[pair.Key] = pair.Value.Errors.Select(error => error.ErrorMessage).ToList();
                    _logger.LogError(3 , pair.Key);
                }
            }
        }
    }
}
