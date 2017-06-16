using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using cloudscribe.Web.Pagination;


namespace HAICOP.Models
{
	public enum Financement
    {
		[Display(Name = "التمويل المحلي")]
        Local = 1,
		[Display(Name = "التمويل الأجنبي")]
		Foreign = 2,
		[Display(Name = "تمويل أجنبي ومحلي")]
		Hybride = 3

    }
	
	public enum MailType 
	{
		[Display(Name = "الصادر")]
		In = 1,
		[Display(Name = "الوارد")]
		Out = 2
	}


	public enum DossierType 
	{
		[Display(Name = "أشغال")]
		Traveaux = 1,
		[Display(Name = "دراسات")]
		Etude = 2,
		[Display(Name = "تزود بمواد")]
		Matiere = 3,
		[Display(Name = "تزود بخدمات")]
		Service = 4
	}



	public enum DossierNature 
	{
		[Display(Name = "عريضة")]
		un = 1,
		[Display(Name = "إستشارة")]
		deux = 2,
		[Display(Name = "ختم")]
		troi = 3,
		[Display(Name = "مختلفة")]
		quatre = 4
	}
	
	public class Dossier 
	{
		public int ID {get ; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Subject {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "عدد الملف")]
		public int Num {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "سنة الملف")]
		public int Year {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "الشهر")]
		public int Month {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "طبيعة الملف")]
		public DossierType Type {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "نوع الملف")]
		public DossierNature Nature {get ; set;}
		
		[Display(Name = "التمويل")]
		public Financement Financement { get ; set;}
		
		[Display(Name = "تاريخ الملف")]
		public DateTime DocDate {get ; set;}
		
		[Display(Name = "تاريخ معالجة الملف")]
		public DateTime TraitDate { get ; set;}
		
		[Display(Name = "التمويل المحلي")]
		public float TotalLocal {get ; set;}
		
		[Display(Name = "التمويل الأجنبي")]
		public float TotalForeign {get ; set;}
		
		[Display(Name = "الممول الأجنبي")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Foreign {get ; set;}
		
		
		public virtual ICollection<Mail> Mails { get; set; }
		public virtual ICollection<Metting> Mettings { get; set; }		
		public virtual ICollection<Fournisseur> Fournisseurs { get; set; }
		public virtual Acheteur Acheteur { get; set; }
		public virtual ICollection<Commission> Commissions { get; set; }
		
	}
	
	public class Mail 
	{
		public int ID {get ; set; }
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(20, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string Ref {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "النوعية")]
		public MailType Type { get ; set;}
		
		[Display(Name = "تاريخ معالجة الملف")]
		public DateTime RecepDate { get ; set;}
		
        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Desc {get ; set;}
		
		
		
	}
	
	public class Dessision
	{
		public int ID {get ; set;}
		
		[ForeignKey("Metting")]
        public int MettingID { get; set; }
		
		public virtual Metting Metting { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "القرار")]
        [StringLength(200, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
	}
	
	public class Fournisseur
	{
		public int ID {get ; set;}
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }

		public virtual ICollection<Lot> Lots { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المزود")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
	}
	
	public class Acheteur
	{
		public int ID {get ; set;}
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "صاحب الصفقة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
	}
	
	public class Lot 
	{
		public int ID { get ; set;}
		
		[ForeignKey("Fournisseur")]
        public int FournisseurID { get; set; }
		
		public virtual Fournisseur Fournisseur { get; set; }
		
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المرجع")]
        [StringLength(200, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 1)]
		public string Lbl {get ; set;}
		
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "القسط")]
		public float Montant {get ; set;}
		
	}
	
	public class Metting
	{
		public int ID { get ; set;}
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }
		
		public virtual Dessision Dessision { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الجلسة")]
		public DateTime DocDate {get ; set;}
		
		
		[Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Desc {get ; set;}
		
	}
	
	public class Commission
	{
		public int ID { get ; set;}
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }

		public virtual Dossier Dossier { get; set; }
		
		public virtual ICollection<Agent> Agents { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم اللجنة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
		
		
        [Display(Name = "إسم اللجنة (لغة فرنسية)")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string LblFr {get ; set;}
		
		[Display(Name = "يوجد رئيس ؟")]
		public bool HavePresident { get ; set;}
		
		public Commission()
		{
			HavePresident = false;
		}
	}
	
	public class Agent 
	{
		public int ID { get ; set;}
		
		[ForeignKey("Commission")]
        public int CommissionID { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الإسم و اللقب")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Name {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الإسم و اللقب (لغة فرنسية)")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string NameFr {get ; set;}
		
		
		[Display(Name = "رئيس اللجنة ؟")]
		public bool IsPresident { get ; set;}
		
		public Agent()
		{
			IsPresident = false;
		}
	}
	
	public class AppsUser 
	{
		[Key]
        [Column(Order = 0)]
        public int AgentID { get; set; }
        public virtual Agent Agent{ get; set; }

        [Key]
        [Column(Order = 1)]
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
	}

	public class ForeignInvestisseur
	{
		public int ID { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم الممول")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string Name {get ; set;}
	}

	public class InvInDossier
	{
		
		[Key]
        [Column(Order = 0)]
        public int ForeignInvestisseurID { get ; set;}
        public virtual ForeignInvestisseur ForeignInvestisseur{ get; set; }

        [Key]
        [Column(Order = 1)]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

	}


#region pagination
	public class ProductListViewModel
    {
        public ProductListViewModel()
        {
            Paging = new PaginationSettings();
        }

        public string Query { get; set; } = string.Empty;

        public List<ForeignInvestisseur> ForeignInvestisseurs { get; set; } = null;

        public PaginationSettings Paging { get; set; }
    }

	public class ViewByCategoriesViewModel
    {
        public ViewByCategoriesViewModel()
        {
            Paging = new PaginationSettings();
            
        }
        public List<ForeignInvestisseur> ForeignInvestisseurs { get; set; }
        public string[] AvailableCategories { get; set; }
        public string[] Categories { get; set; }

        public PaginationSettings Paging { get; set; }
    }
#endregion
	

}