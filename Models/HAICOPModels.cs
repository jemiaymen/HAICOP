using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace HAICOP.Models
{
	public enum NaturePrice
	{
		[Display(Name = "أسعار ثابتة")]
        Fixe = 1,
		[Display(Name = "أسعار قابلة للمراجعة")]
		Review = 2
	}

	public enum MethodPrice
	{
		[Display(Name = "أسعار فردية")]
        Alone = 1,
		[Display(Name = "أسعار جزافية")]
		Excessif = 2
	}

	public enum Method
    {
		[Display(Name = "مسبوق بانتقاء")]
        First = 1,
		[Display(Name = "طلب عروض مفتوح")]
        Open = 2,
		[Display(Name = "طلب عروض مضيق")]
		Close = 3,
		[Display(Name = "طلب عروض دولي")]
		International = 4,
		[Display(Name = "طلب عروض بتمويل")]
		WithFinancement = 5,
		[Display(Name = "إستشارة")]
		Consultation = 6,
		[Display(Name = "مناظرة")]
		Concour = 7,
		[Display(Name = "إتفاق مباشر")]
		AgreeDirect = 8,
		[Display(Name = "استشارة دولية")]
		ConsultationInternational = 9,
		[Display(Name = "طلب ترشحات")]
		DemandeSelection = 10,
		[Display(Name = "عقد")]
		Contra = 11,
		[Display(Name = "مناقصة")]
		Tender = 12
    }

	public enum MethodTri
	{
		[Display(Name = "طلبات عادية")]
        Normal = 1,
		[Display(Name = "طلبات معقدة")]
		Complex = 2
	}

	public enum Financement
    {
		[Display(Name = "التمويل ذاتي")]
        Local = 1,
		[Display(Name = "ميزانية")]
		Budget = 3,
		[Display(Name = "التمويل الأجنبي")]
		Foreign = 2
    }
	
	public enum MailType 
	{
		[Display(Name = "الوارد")]
		Out = 2,
		[Display(Name = "الصادر")]
		In = 1
	}

    public enum MailNature
    {
        [Display(Name = "جديد")]
        New = 1,
        [Display(Name = "عناصر إجابة")]
        Rep = 2,
        [Display(Name = "وثائق تكميلية")]
        Compl = 3,
        [Display(Name = "الموافقة")]
        Accept = 4,
        [Display(Name = "إطلعت")]
        Vue = 5,
        [Display(Name = "موافاة")]
        Mouwafat = 6,
        [Display(Name = "إرجاء")]
        ReVue = 7,
        [Display(Name = "عدم الموافقة")]
        Refu = 8,
        [Display(Name = "عدم الإختصاص")]
        NotSpeciality = 9,
        [Display(Name = "الإجابة")]
        Repense = 10,
        [Display(Name = "إرجاع الملف")]
        SendBack = 11,
        [Display(Name = "عدم وجاهة")]
        RefuTwo = 12,
        [Display(Name = "يلغي ويعوض")]
        RefuAndChangement = 13,
        [Display(Name = "غير مثمر")]
        NonComform = 14,
        [Display(Name = "تذكير")]
        Rappel = 15,
        [Display(Name = "إعادة إعلان")]
        ReAnnonce = 16,
        [Display(Name = "إمضاء عقد")]
        Signature = 17
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
		Petition = 1,
		[Display(Name = "إستشارة")]
		Consultation = 2,
		[Display(Name = "ملحق")]
		Avenant = 3,
		[Display(Name = "تقرير فرز العروض")]
		Rapport = 4,
		[Display(Name = "صفقة إطارية")]
		Affaire = 5,
		[Display(Name = "صفقة بالتفاوض المباشر")]
		AffaireDirect = 6,
		[Display(Name = "ختم نهائي")]
		Final = 7,
		[Display(Name = "قائمة الصفقات")]
		ListAffaire = 8,
		[Display(Name = "المخطط التقديري")]
		Prevu = 9,
		[Display(Name = "تكوين")]
		Formation = 10,
		[Display(Name = "موقع واب")]
		Web = 11,
		[Display(Name = "بطاقة تأليفية")]
		Carte = 12,
		[Display(Name = "نتيجة طلب العروض")]
		ResulatAffaire = 13,
		[Display(Name = "بطاقة بيانات")]
		CarteDeDonne = 14,
		[Display(Name = "معطيات تتعلق بالصفقات")]
		AffaireDonnee = 15,
		[Display(Name = "مراسلات مختلفة")]
		MessageDiver = 16,
		[Display(Name = "نشر إعلان")]
		Annonce = 17,
		[Display(Name = "تسجيل")]
		Enregistrement = 18,
		[Display(Name = "إجتماع")]
		Reunion = 19
	}

	public enum DossierState 
	{
		[Display(Name = "اظافة")]
		Creation = 1,
		[Display(Name = "جاري")]
		Encour = 2,
		[Display(Name = "استراحة")]
		Pause = 3,
		[Display(Name = "إنجاز")]
		Traitement = 4,
		[Display(Name = "القبول")]
		Accept = 5,
		[Display(Name = "الرفض")]
		Refus = 6
	}
	
	public class Dossier 
	{
		public int ID {get ; set; }

		[ForeignKey("Commission")]
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
		
		[Display(Name = "التمويل")]
		public Financement Financement { get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الملف")]
		[DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
		public DateTime DocDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ قبول الملف ")]
		[DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
		public DateTime EnterDate {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = " تاريخ التعهد")]
		[DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
		public DateTime ProDate {get ; set;}
		
		[Display(Name = "تاريخ معالجة الملف")]
		[DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
		public DateTime TraitDate { get ; set;}
		
		[Display(Name = "التمويل المحلي")]
		public decimal TotalLocal {get ; set;}
		
		[Display(Name = "التمويل الأجنبي")]
		public decimal TotalForeign {get ; set;}
		
		[Display(Name = "الممول الأجنبي")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Foreign {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "حالت الملف")]
		public DossierState State {get ; set;}
		
		
		public virtual ICollection<Mail> Mails { get; set; }
		public virtual ICollection<Metting> Mettings { get; set; }		
		public virtual Commission Commission { get; set; }

		public Dossier()
		{
			State = DossierState.Creation;
		}
		
	}
	
	public class Mail 
	{
		public int ID {get ; set; }
		
		[ForeignKey("Dossier")]
		[Display(Name = "الملف")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }
		
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
		
		[Display(Name = "تاريخ المراسلة")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime MailDate { get ; set;}
		
        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 5)]
		public string Desc {get ; set;}

		[Display(Name = "الوثيقة")]
		[Url(ErrorMessage="الرجاء التثبت من الرابط")]
		public string Url {get ; set;}

        [Display(Name = "الجلسة")]
        public int MettingID { get; set; }

    }
	
	public class Dessision
	{
		public int ID {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "القرار")]
        [StringLength(200, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
	}
	
	public class Fournisseur
	{
		public int ID {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "صاحب الصفقة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
	}
	
	public class Acheteur
	{
		public int ID {get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = " (إختصار) المشتري العمومي")]
        [StringLength(100, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المشتري العمومي")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string LblLong {get ; set;}
	}
	
	
	public class Metting
	{
		public int ID { get ; set;}
		
		[ForeignKey("Dossier")]
        public int DossierID { get; set; }
		
		public virtual Dossier Dossier { get; set; }
		
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الاجتماع")]
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
		
	}
	
	public class Commission
	{
		public int ID { get ; set;}

		public virtual ICollection<Dossier> Dossiers { get; set; }
		
		public virtual ICollection<Agent> Agents { get; set; }

        public virtual NextNum NextNum { get; set; }
		
		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم اللجنة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Lbl {get ; set;}
		
		
        [Display(Name = "إسم اللجنة (لغة فرنسية)")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string LblFr {get ; set;}
		
		[Display(Name = "يوجد رئيس ؟")]
		public bool HavePresident { get ; set;}

		[Display(Name = "رمز اللجنة")]
		[StringLength(100, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 1)]
		public string Code { get ; set;}
		
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

		public virtual Commission Commission { get; set; }
		
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
	
	public class Rapporteur 
	{
		[Key]
        [Column(Order = 0)]
        public int AgentID { get; set; }
        public virtual Agent Agent{ get; set; }

        [Key]
        [Column(Order = 1)]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }
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
        public virtual ForeignInvestisseur ForeignInvestisseur { get; set; }

        [Key]
        [Column(Order = 1)]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

	}

	public class AchInDossier
	{
		[Key]
        [Column(Order = 0)]
        public int AcheteurID { get ; set;}
        public virtual Acheteur Acheteur { get; set; }

        [Key]
        [Column(Order = 1)]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }
	}

	public class FourInDossier
	{
		[Key]
        [Column(Order = 0)]
        public int FournisseurID { get ; set;}
        public virtual Fournisseur Fournisseur { get; set; }

        [Key]
        [Column(Order = 1)]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Display(Name = "المرجع")]
        [StringLength(200, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 1)]
		public string Lbl {get ; set;}
		
        [Display(Name = "القسط")]
		[DisplayFormat(DataFormatString = "{0:N3}")]
		public decimal Montant {get ; set;}

        [Display(Name = "تمويل أجنبي")]
		public bool Foreign {get ; set;}

	}

	public class DessisionInMetting
	{
		[Key]
        [Column(Order = 0)]
        public int DessisionID { get ; set;}
        public virtual Dessision Dessision { get; set; }

        [Key]
        [Column(Order = 1)]
        public int MettingID { get; set; }
        public virtual Metting Metting { get; set; }
	}

	public class UserAgent
	{
		[Key]
        [Column(Order = 0)]
        public int AgentID { get ; set;}
        public virtual Agent Agent { get; set; }

        [Key]
        [Column(Order = 1)]
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
	}

	public class UserCommission
	{
		[Key]
        [Column(Order = 0)]
        public int CommissionID { get ; set;}
        public virtual Commission Commission { get; set; }

        [Key]
        [Column(Order = 1)]
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
	}


    public class NextNum
    {
        [Key]
        [Column(Order = 0)]
        public int CommissionID { get; set; }
        public virtual Commission Commission { get; set; }

        [Display(Name = "العدد")]
        public int Next { get; set; }

    }
}