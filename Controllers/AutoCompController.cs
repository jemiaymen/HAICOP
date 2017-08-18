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

namespace HAICOP.Controllers
{
    
    public class AutoCompController : BaseCtrl
    {

        public AutoCompController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
                                base(userManager,signInManager,db) 
        {}

        [HttpGet]
        [Route("api/sug/invest")]
        public dynamic invest()
        {
            var result = db.ForeignInvestisseur.Select(a => new {
                                                        value = a.Name,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/four")]
        public dynamic four()
        {
            var result = db.Fournisseur.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/ach")]
        public dynamic acheteur()
        {
            var result = db.Acheteur.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/comm")]
        public dynamic commission()
        {
            var result = db.Commission.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/agent")]
        public dynamic agent()
        {
            var result = db.Agent.Select(a => new {
                                                        value = a.Name,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/mail")]
        public dynamic mail()
        {
            var result = db.Mail.Select(a => new {
                                                        value = a.Ref,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/docsub")]
        public dynamic docsub()
        {
            var result = db.Dossier.Select(a => new {
                                                        value = a.Subject,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/docnum")]
        public dynamic docnum()
        {
            var result = db.Dossier.Select(a => new {
                                                        value = a.Num,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/dess")]
        public dynamic dess()
        {
            var result = db.Dessision.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }


        [HttpGet]
        [Route("api/agent/{id}")]
        public dynamic agent(int id)
        {
            var result = db.Agent.Where(c => c.CommissionID == id && c.IsPresident == false ).Select(a => new {
                                                        Lbl = a.Name,
                                                        ID = a.ID
                                                    }).ToList();
            return result;
        }

        [HttpGet]
        [Route("api/doc/{id}")]
        public dynamic doc(int id)
        {
            var result = db.Dossier.Where(c => c.CommissionID == id && c.State == DossierState.Creation ).Select(a => new {
                                                        Subject = a.Subject,
                                                        ID = a.ID
                                                    }).ToList();
            return result;
        }

        [HttpGet]
        [Route("api/doc/ache/{com}/{ach}")]
        public dynamic docache(int com , int ach)
        {
            var result = db.AchInDossier.Include(d => d.Dossier)
                                                .Where(c => c.Dossier.CommissionID == com && c.AcheteurID == ach && c.Dossier.State == DossierState.Creation  )
                                                .Select(a => new {
                                                        Subject = a.Dossier.Subject,
                                                        ID = a.DossierID
                                                    }).ToList();
            return result;
        }

        [HttpGet]
        [Route("api/img/{id}")]
        public dynamic img(int id)
        {

            try
            {
                var result = db.Mail.SingleOrDefault(m => m.DossierID == id);
                return result.Url;
            }
            catch (Exception)
            {

            }
            
            return null;
        }

        [HttpGet]
        [Route("api/edit/doc/{id}")]
        public dynamic editdoc(int id)
        {
            var result = db.Dossier.Where(c => c.CommissionID == id ).Select(a => new {
                                                        Subject = a.Subject,
                                                        ID = a.ID
                                                    }).ToList();
            return result;
        }

        [HttpGet]
        [Route("api/img/id/{did}/{imid}")]
        public dynamic img(int did , int imid)
        {
            try
            {
                var result = db.Mail.SingleOrDefault(m => m.DossierID == did && m.ID == imid);
                return result.Url;
            }
            catch (Exception)
            {

            }
            
            return null;
        }

        [HttpGet]
        [Route("api/four")]
        public dynamic fourauto()
        {
            return db.ForeignInvestisseur.ToList();
        }


        [HttpGet]
        [Route("api/stat/comm/{year}")]
        public dynamic statcomm(int year)
        {
            var from = new DateTime(year,1,1);
            var to = new DateTime(year,12,30);

            var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.TraitDate >= from && d.TraitDate <= to)
                                        .GroupBy( d => d.Commission.LblFr)
                                        .Select( s => new TestMonth {
                                                Count = s.Count() , 
                                                Lbl = s.Key 
                                             }) ;
                                             
            var labels = doc.Select( a => a.Lbl).ToArray();
            var data = doc.Select(a => a.Count).ToArray();
            string[] backgroundColor = { "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e01a4","#0392ce","#a7194b","#fd5308","#fb9902"};
            var datasets = new { data = data , backgroundColor = backgroundColor};
            return new { labels = labels , datasets = datasets  };
        }

        [HttpGet]
        [Route("api/stat/montant/{year}")]
        public dynamic statmontant(int year)
        {
            var from = new DateTime(year,1,1);
            var to = new DateTime(year,12,30);

            var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.TraitDate >= from && d.TraitDate <= to)
                                        .GroupBy( d => d.Commission.LblFr)
                                        .Select( s => new TestMonth {
                                                Montant = db.FourInDossier.Where( d => s.Select( a => a.ID).Contains(d.DossierID)).Sum( m => m.Montant) , 
                                                Lbl = s.Key 
                                             }) ;
                                             
            var labels = doc.Select( a => a.Lbl).ToArray();
            var data = doc.Select(a => a.Montant).ToArray();
            string[] backgroundColor = { "#3e01a4","#0392ce","#a7194b","#fd5308","#fb9902","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"};
            var datasets = new { data = data , backgroundColor = backgroundColor};
            return new { labels = labels , datasets = datasets  };
        }

        [HttpGet]
        [Route("api/stat/nbr/{year}")]
        public dynamic statnbr(int year)
        {
            var from = new DateTime(year,1,1);
            var to = new DateTime(year,12,30);

            var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.TraitDate >= from && d.TraitDate <= to)
                                        .GroupBy( d => d.Commission.LblFr)
                                        .Select( s => new TestMonth {
                                                Nbr = s.Select( a => a.Mettings.Sum(b => b.MettNbr)).Sum() , 
                                                Lbl = s.Key 
                                             }) ;
                                             
            var labels = doc.Select( a => a.Lbl).ToArray();
            var data = doc.Select(a => a.Nbr).ToArray();
            string[] backgroundColor = {"#fd5308","#fb9902","#e8c3b9","#3e95cd", "#8e5ea2","#3cba9f", "#3e01a4","#0392ce","#a7194b","#c45850"};
            var datasets = new { data = data , backgroundColor = backgroundColor};
            return new { labels = labels , datasets = datasets  };
        }
    }
}