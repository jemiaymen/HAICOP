using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{
    public class NewDossier 
	{
		// Part one
		public int ID {get ; set; }

        [Required(ErrorMessage = "اجباري")]
		[Display(Name = "اللجنة")]
        public int CommissionID { get; set; }

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Subject {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "عدد الملف")]
		public int Num {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "طبيعة الملف")]
		public DossierType Type {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "نوع الملف")]
		public DossierNature Nature {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الملف" )]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DocDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ قبول الملف ")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime EnterDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = " تاريخ التعهد")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime ProDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المشتري العمومي")]
        public int AcheteurID { get ; set;}

		//part two
		
		[Display(Name = "التمويل")]
		public Financement Financement { get ; set;}

		[Display(Name = "التمويل المحلي")]
		public float TotalLocal {get ; set;}
		
		[Display(Name = "التمويل الأجنبي")]
		public float TotalForeign {get ; set;}
		
		[Display(Name = "الممول الأجنبي")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Foreign {get ; set;}
		
        [Display(Name = "المزود")]
        public int FournisseurID { get ; set;}

		[Display(Name = "حالت الملف")]
		public DossierState State {get ; set;}

		//mail details


        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المرجع")]
        [StringLength(20, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string Ref {get ; set;}

        [Display(Name = "المرجع الأصلي")]
        [StringLength(20, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string OriginRef {get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المصدر")]
        [StringLength(255, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string From {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "النوعية")]
		public MailType MailType { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة المراسلة")]
		public MailNature MailNature { get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ المراسلة")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime MailDate { get ; set;}
		
        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Desc {get ; set;}

		[Display(Name = "الوثيقة")]
		[FileExtensions(Extensions ="pdf" , ErrorMessage = "يقبل ملفات  (pdf)")]
		public string Url {
				get
				{
					if (Location != null)
						return Location.FileName;
					else
						return "";
				} 
				set
				{
					Url = value; 
				}
		}

		[Required(ErrorMessage = "اجباري")]
		[DataType(DataType.Upload)]
		public IFormFile Location { get ; set;}

		
	}

	public class Rapp 
	{
		public int ID {get ; set; }

		[Display(Name = "اللجنة")]
        public int CommissionID { get; set; }


        [Display(Name = "الموضوع")]
		public string Subject {get ; set;}

        [Display(Name = "المشتري العمومي")]
        public int AcheteurID { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "المقرر")]
        public int AgentID { get ; set;}
		
	}
}