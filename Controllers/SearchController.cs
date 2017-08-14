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
    [Authorize]
    public class SearchController : BaseCtrl
    {

        private ILogger _logger;

        public SearchController (UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                                ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<SearchController>();
    
        }

        public IActionResult Index(string q)
        {
            int num = 0;
            Int32.TryParse(q, out num);
            var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.Subject.Contains(q) || d.Commission.Lbl.Contains(q) || d.Num == num );

            List<DocDetail> re = new List<DocDetail>();
            foreach( var item in doc)
            {

                var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == item.ID)
                                                 .Select(f => f.Fournisseur)
                                                 .ToList();

                var tmp = new DocDetail { Dossier = item  };

                try
                {
                    var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                    .Single( a => a.DossierID == item.ID).Acheteur ;
                    tmp.Acheteur = achteur;
                }
                catch(Exception)
                {

                }
                

                try 
                {
                    var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    tmp.Rapporteur = rapporteur;
                }
                catch(Exception)
                {

                }
                
                try 
                {
                    var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                            .Include( d => d.Metting)
                                                            .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;
                    tmp.Dessision = dessision;
                }
                catch(Exception)
                {

                }
                

                if(four != null)
                {
                    tmp.Fournisseurs = four;
                }


                re.Add(tmp);
            }
                                        
            return View(re);
        }

        public IActionResult Detail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .FirstOrDefault(d => d.ID == id.GetValueOrDefault() );

            if(doc == null)
            {
                return NotFound();
            }

            DocDetail re = new DocDetail {Dossier = doc};

            try
            {
                var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == doc.ID)
                                                 .ToList();
                re.FinD = four;
            }
            catch(Exception)
            {

            }

                
            try 
            {
                var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                    .SingleOrDefault( a => a.DossierID == doc.ID).Acheteur ;
                re.Acheteur = achteur;
            }
            catch(Exception)
            {

            }   

            try
            {
                var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == doc.ID).Agent;
                re.Rapporteur = rapporteur;
            }
            catch(Exception)
            {

            }

            try
            {
                var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                            .Include( d => d.Metting)
                                                            .SingleOrDefault( d => d.Metting.DossierID == doc.ID).Dessision;
                re.Dessision = dessision;
            }
            catch(Exception)
            {

            }
                
                
                


            return View(re);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Rapporteur(SearchRapp search)
        {
            if(ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["AgentID"] = new SelectList(db.Agent.Where(a => a.IsPresident == false).ToList(), "ID", "Name");

                        return View("Rapp",search);
                    }

                    var doc = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID && 
                                         (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                   .ToList();
                    return View("Result",doc);
                }

                if(search.From != null)
                {
                    var res = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID &&  d.Dossier.ProDate >= search.From   )
                                   .ToList();
                    return View("Result",res);
                }

                if(search.To != null)
                {
                    var rese = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID &&  d.Dossier.ProDate <= search.To   )
                                   .ToList();
                    return View("Result",rese);
                }

                var re = db.Rapporteur.Include( d => d.Dossier)
                                      .Include( d => d.Agent)
                                      .Include( d => d.Dossier.Commission)
                                      .Include(d => d.Dossier.Mettings)
                                      .Include(d => d.Dossier.Mails)
                                      .Where( d => d.AgentID == search.ID )
                                      .ToList();
                return View("Result",re);
            }
            return View("Result");
            
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Commission(SearchStruct search)
        {
            if(ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");

                        return View("Struct",search);
                    }

                    var doc = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.Agent.CommissionID == search.CommissionID && 
                                         (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                   .ToList();
                    return View("Result",doc);
                }

                if(search.From != null)
                {
                    var res = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.Agent.CommissionID == search.CommissionID &&   d.Dossier.ProDate >= search.From   )
                                   .ToList();
                    return View("Result",res);
                }

                if(search.To != null)
                {
                    var rese = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.Agent.CommissionID == search.CommissionID &&   d.Dossier.ProDate <= search.To   )
                                   .ToList();
                    return View("Result",rese);
                }

                var re = db.Rapporteur.Include( d => d.Dossier)
                                      .Include( d => d.Agent)
                                      .Include( d => d.Dossier.Commission)
                                      .Include(d => d.Dossier.Mettings)
                                      .Include(d => d.Dossier.Mails)
                                      .Where( d => d.Agent.CommissionID == search.CommissionID )
                                      .ToList();
                return View("Result",re);
            }
            return View("Result");
            
        }
        public IActionResult Rapp()
        {
            ViewData["AgentID"] = new SelectList(db.Agent.Where(a => a.IsPresident == false).ToList(), "ID", "Name");
            return View();
        }

        public IActionResult Struct()
        {
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            return View();
        }

        public IActionResult Acheteur()
        {
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Acheteur(SearchAcheteur search)
        {
            if(ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");

                        return View(search);
                    }

                    var doc = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID && 
                                                        (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                             .ToList();

                    return View("ResultAch",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID &&  d.Dossier.ProDate >= search.From   )
                                             .ToList();

                    return View("ResultAch",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID &&   d.Dossier.ProDate <= search.To)
                                             .ToList();

                    return View("ResultAch",doc2);
                }

                var doc3 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID )
                                             .ToList();

                    return View("ResultAch",doc3);
            }
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");
            return View();
        }

        public IActionResult Fournisseur()
        {
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Fournisseur(SearchFournisseur search)
        {
            if(ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

                        return View(search);
                    }

                    var doc = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID && 
                                                        (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                             .ToList();

                    return View("Resultf",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID &&   d.Dossier.ProDate >= search.From   )
                                             .ToList();

                    return View("Resultf",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID &&    d.Dossier.ProDate <= search.To)
                                             .ToList();

                    return View("Resultf",doc2);
                }

                var doc3 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID )
                                             .ToList();

                    return View("Resultf",doc3);
            }
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(search);
        }

        public IActionResult TypeFinancement()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult TypeFinancement(SearchFina search)
        {
            if(ModelState.IsValid)
            {
                
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");

                        return View(search);
                    }

                    var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.Financement == search.Financement &&
                                                    (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();

                    return View("ResultFore",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement &&  d.ProDate >= search.From  )
                                        .ToList();

                    return View("ResultFore",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement && d.ProDate <= search.To) 
                                        .ToList();

                    return View("ResultFore",doc2);
                }

                var doc3 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement  )
                                        .ToList();

                    return View("ResultFore",doc3);
            }
            return View(search);
        }

        public IActionResult ForeignInv()
        {
            ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ForeignInv(SearchForeign search)
        {
            if(ModelState.IsValid)
            {
                
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");

                        return View(search);
                    }

                    var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign &&
                                                    (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();

                    return View("ResultFore",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign &&  d.ProDate >= search.From  )
                                        .ToList();

                    return View("ResultFore",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign && d.ProDate <= search.To) 
                                        .ToList();

                    return View("ResultFore",doc2);
                }

                var doc3 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign  )
                                        .ToList();

                    return View("ResultFore",doc3);
            }

            ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");
            return View(search);
        }

        
    }
}