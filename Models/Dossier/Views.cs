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
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 12)]
		public string Subject {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "عدد الملف")]
		public decimal Num {get ; set;}

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
		[DisplayFormat(DataFormatString = "{0:F}", ApplyFormatInEditMode = true)]
		public decimal TotalLocal {get ; set;}
		
		[Display(Name = "التمويل الأجنبي")]
		[DisplayFormat(DataFormatString = "{0:F}", ApplyFormatInEditMode = true)]
		public decimal TotalForeign {get ; set;}
		
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

		
		public void InitFromAchaInDossier(AchInDossier doc)
		{
			ID = doc.DossierID;
			CommissionID = doc.Dossier.CommissionID;
			AcheteurID = doc.AcheteurID;
			Subject = doc.Dossier.Subject;
			Num = doc.Dossier.Num;
			Type = doc.Dossier.Type;
			Nature = doc.Dossier.Nature;
			DocDate = doc.Dossier.DocDate;
			EnterDate = doc.Dossier.EnterDate;
			ProDate = doc.Dossier.ProDate;
		}

		public void InitFromDossier(Dossier doc,int AID)
		{
			ID = doc.ID;
			CommissionID = doc.CommissionID;
			AcheteurID = AID;
			Subject = doc.Subject;
			Num = doc.Num;
			Type = doc.Type;
			Nature = doc.Nature;
			DocDate = doc.DocDate;
			EnterDate = doc.EnterDate;
			ProDate = doc.ProDate;
		}

		
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

	public class EditMail
	{
		[Required(ErrorMessage = "اجباري")]
		public int ID {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		public int DossierID {get ; set;}
		
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
		public string Url { get ; set;}

		[DataType(DataType.Upload)]
		public IFormFile Location { get ; set;}

		public void InitFromMail(Mail mail)
		{
			ID = mail.ID;
			DossierID = mail.DossierID;
			Ref = mail.Ref ;
			OriginRef = mail.OriginRef;
			From = mail.From;
			MailType = mail.MailType;
			MailNature = mail.MailNature;
			MailDate = mail.MailDate;
			Desc = mail.Desc;
			Url = mail.Url;
		}

	}

	public class AddMail
	{
		[Required(ErrorMessage = "اجباري")]
		public int DossierID {get ; set;}

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
		}

		
		[DataType(DataType.Upload)]
		public IFormFile Location { get ; set;}


		public void InitFromMail(Mail mail)
		{
			DossierID = mail.DossierID;
			Ref = mail.Ref ;
			OriginRef = mail.OriginRef;
			From = mail.From;
			MailType = mail.MailType;
			MailNature = mail.MailNature;
			MailDate = mail.MailDate;
			Desc = mail.Desc;
		}

		[Display(Name = "المقرر")]
		public int AgentID {get ; set;}
	}

	public class AddFina 
	{
		[Required(ErrorMessage = "اجباري")]
		public int DossierID {get ; set;}

        [Display(Name = "إسم الممول")]
		public int ForeignInvestisseurID { get ; set;}

		[Display(Name = "الممول الأجنبي")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Foreign {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "التمويل")]
		public Financement Financement { get ; set;}

	}


	public class AddAvis : AddMail
	{

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "رأي اللجنة")]
		public int DessisionID {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الاجتماع")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime MettDate {get ; set;}

		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ التبليغ")]
		public DateTime NotifDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "عدد الجلسات")]
		public int MettNbr {get ; set;}

		[Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string MettDesc {get ; set;}

        [Display(Name = "الأسباب")]
        public Cause Cause { get; set; }


        public void InitFromMetting(Metting metting)
		{
			MettDate = metting.MettDate ;
			NotifDate = metting.NotifDate;
			MettNbr = metting.MettNbr;
			MettDesc = metting.MettDesc;
		}

	}

	public class EditAvis : AddAvis
    {
		[Required(ErrorMessage="إجباري")]
		public int MailID { get ; set;}


        [Required(ErrorMessage = "اجباري")]
        public int MettingID { get; set; }


        [Display(Name = "الوثيقة")]
        new public string Url { get; set; }

        

    }


    public class AddFour
	{
		[Required(ErrorMessage = "اجباري")]
		public int DossierID {get ; set;}

		public int tmpFournisseurID { get ; set;}

		[Display(Name = "المزود")]
		public int FournisseurID { get ; set;}

		[Display(Name = "القسط")]
        [StringLength(200, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 1)]
		public string Lbl {get ; set;}

		[Display(Name = "المبلغ")]
		[DisplayFormat(DataFormatString = "{0:F3}" , ApplyFormatInEditMode = true)]
		public decimal Montant {get ; set;}

		[Display(Name = "تمويل أجنبي")]
		public bool Foreign {get ; set;}

        [Display(Name = "تاريخ الإجتماع")]
        [DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
        public DateTime MettingDate { get; set; }

        [Display(Name = "منجزة")]
        public bool Done { get; set; }

        public AddFour()
		{
			Foreign = false;
		}

		public void InitFromFinD(FourInDossier doc)
		{
			DossierID =  doc.DossierID;
			FournisseurID = doc.FournisseurID;
			Lbl = doc.Lbl;
			Montant = doc.Montant;
			Foreign = doc.Foreign;
            MettingDate = doc.MettingDate;
            Done = doc.Done;
		}
	}

	public class DocDetail
	{
		public Dossier Dossier {get ; set;}
		public Commission Commission {get ; set;}
		public Acheteur Acheteur { get ; set;}
		public List<Fournisseur> Fournisseurs { get ; set;}
		public Agent Rapporteur { get ; set;}
		public Dessision Dessision {get ; set;}

		public List<FourInDossier> FinD { get ; set;}

	}

	public class RapporteurView
	{
		public AchInDossier Dossier { get ; set;}
		public Rapporteur Rapporteur { get ; set; }
	}

    public class DetailCommView : RapporteurView
    {
        public List<Fournisseur> Fournisseur { get; set; }
        public List<DessisionInMetting> Metting { get; set; }
    }

    public class DocumentView
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        [Display(Name = "الملف")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }


        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الصفة")]
        public NatureDocument Nature { get; set; }

        [Display(Name = "الوثيقة")]
        [FileExtensions(Extensions = "pdf,docx", ErrorMessage = "يقبل ملفات  (pdf,docx)")]
        public string Url
        {
            get
            {
                if (Location != null)
                    return Location.FileName;
                else
                    return "";
            }
        }


        [DataType(DataType.Upload)]
        public IFormFile Location { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المكان الأصلي")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string RealPath { get; set; }

        [Display(Name = "تاريخ الملف")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }

    }

}