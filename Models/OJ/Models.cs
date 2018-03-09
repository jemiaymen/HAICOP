using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HAICOP.Models
{


    public class Guest
    {
        public int ID { get; set; }

        [ForeignKey("Acheteur")]
        public int AcheteurID { get; set; }
        public virtual Acheteur Acheteur { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الإسم واللقب")]
        [StringLength(20, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string FirstLastName { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الصفة")]
        public GuestType Type { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "البريد الإلكتروني")]
        [DataType(DataType.EmailAddress,ErrorMessage ="الرجاء إدخال بريد الكتروني صحيح")]
        public string Email { get; set; }

        [Display(Name = "الهاتف الجوال")]
        [DataType(DataType.PhoneNumber)]
        public string Tel { get; set; }

        [Display(Name = "الهاتف القار")]
        [DataType(DataType.PhoneNumber)]
        public string Fix { get; set; }

        [Display(Name = "معطيات أخرى")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string Desc { get; set; }

    }

    public class Member
    {
        [Key]
        public int ID { get; set; }

        public int CommissionID { get; set; }

        [ForeignKey("Guest")]
        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الأعضاء")]
        public int GuestID { get; set; }
        public virtual Guest Guest { get; set; }
    }

    public class Document
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
        [Url(ErrorMessage = "الرجاء التثبت من الرابط")]
        public string Url { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المكان الأصلي")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string RealPath { get; set; }

        [Display(Name = "تاريخ الملف")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }

    }

    public class Encour
    {
        public int ID { get; set; }

        [ForeignKey("Commission")]
        [Display(Name = "اللجنة")]
        public int CommissionID { get; set; }
        public virtual Commission Commission { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تقرير تقييم العروض الفنية والمالية")]
        public int  RapportFinanceTechnique { get; set; }

        [Display(Name = "انتقاء أولي")]
        public int Fouillement { get; set; }

        [Display(Name = "استشارة")]
        public int Consultation { get; set; }

        [Display(Name = "نزاع")]
        public int Debat { get; set; }

        [Display(Name = "التفاوض المباشر")]
        public int NegociationDirect { get; set; }

        [Display(Name = "صفقة إطارية")]
        public int AccordCadre { get; set; }

        [Display(Name = "ملحق")]
        public int Avenant { get; set; }

        [Display(Name = "ختم نهائي")]
        public int Final { get; set; }

    }

    public class OJ
    {
        public int ID { get; set; }

        [Display(Name = "اللجنة")]
        public int CommissionID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد جدول الأعمال")]
        [DisplayFormat(DataFormatString = "{0:N0}")]
        public decimal Num { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "السنة")]
        public int Year { get; set; }

        public virtual ICollection<DocInOJ> Dossier { get; set; }
        public virtual ICollection<Invite> Invite { get; set; }

    }

    public class Invite
    {
        public int ID { get; set; }

        [ForeignKey("OJ")]
        [Display(Name = "جدول الأعمال")]
        public int OJID { get; set; }
        public virtual OJ OJ { get; set; }

        [ForeignKey("Guest")]
        [Display(Name = "الأعضاء")]
        public int GuestID { get; set; }
        public virtual Guest Guest { get; set; }


    }

    public class DocInOJ
    {
        public int ID { get; set; }

        [ForeignKey("OJ")]
        [Display(Name = "جدول الأعمال")]
        public int OJID { get; set; }
        public virtual OJ OJ { get; set; }


        [ForeignKey("Dossier")]
        [Display(Name = "الملف")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ الملف ")]
        //[DisplayFormat(DataFormatString = "{0:yyyy/MM/dd}")]
        public DateTime Date { get; set; }

    }


}