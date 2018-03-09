using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HAICOP.Models
{
    public class AcheteurDetail
    {
        public int ID { get; set; }

        [ForeignKey("Acheteur")]
        public int AcheteurID { get; set; }
        public virtual Acheteur Acheteur { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الهاتف")]
        [DataType(DataType.PhoneNumber)]
        public string Tel { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الفاكس")]
        [DataType(DataType.PhoneNumber)]
        public string Fax { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم المسؤول عن خلية الصفقات العمومية و لقبه")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string FirstLastName { get; set; }
    }

    public class FournisseurDetail
    {
        public int ID { get; set; }

        [ForeignKey("Fournisseur")]
        public int FournisseurID { get; set; }
        public virtual Fournisseur Fournisseur { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "جنسيته")]
        public string Nationalite { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "النشاط")]
        public string Activity { get; set; }

        [Display(Name = "الإختصاص")]
        public string Speciality { get; set; }

        [Display(Name = "الصنف")]
        public string Category { get; set; }
    }

    public class DossierDetail
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "صفقة مخصصة لفائدة المؤسسات الصغرى")]
        public bool IsSmall { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الصفقة")]
        public Nature Nature { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد الأقساط")]
        public int NbrLot { get; set; }
    }

    public class DossierDelais
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ الإعلان عن المنافسة")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAnConc { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "آخر أجل لقبول العروض الفنية")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateLastChanceAcceptTechnique { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ فتح العروض الفنية")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOpenAnTechnique { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ فتح العروض المالية")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOpenAnFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ تعهد لجنة الصفقات بالملف المالي")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateProFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ تعهد لجنة الصفقات بالملف الفني")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateProTech { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ رأي لجنة الصفقات المالي")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAvisFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ رأي لجنة الصفقات الفني")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAvisTech { get; set; }

        [Display(Name = "تاريخ إبرام الصفقة")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateDebu { get; set; }

        [Display(Name = "تاريخ بداية الإنجاز")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateTraveau { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "آجال الإنجاز")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string DelaiTraveau { get; set; }
    }

    public class Concurrence
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد ساحبي كراسات الشروط")]
        public int NbrChaier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض")]
        public int NbrOffre { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض الملغات قبل الفرز المالي")]
        public int NbrSuppBeforeFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض التي تم عرضها المالي")]
        public int NbrOffreFinance { get; set; }

    }

    public class InfoValeur
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Display(Name = "معلومات حول تقييم العروض")]
        public Valeur Valeur { get; set; }

        [Display(Name = "العدد الفني")]
        public int NbrTech { get; set; }

        [Display(Name = "العدد المالي")]
        public int NbrFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الأسعار")]
        public NaturePrice NaturePrice { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "صيغة الأسعار")]
        public MethodPrice MethodPrice { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تقديرات المشتري العمومي")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        public decimal TotalEstimation { get; set; }

        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string Description { get; set; }

    }

    public class Estimation
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = " Lbl")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public decimal Lbl { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "Montant ")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        public decimal Montant { get; set; }

    }

    public class Moinsdis
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Display(Name = "معايير المطابقة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string Critere { get; set; }

        [Display(Name = "عدد العروض المطابقة")]
        public int NbrConform { get; set; }

    }

    public class Balance
    {
        public int ID { get; set; }

        [ForeignKey("Dossier")]
        public int DossierID { get; set; }
        public virtual Dossier Dossier { get; set; }

        [Display(Name = "المعايير المعتمدة للفرز الفني")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string CritereComplex { get; set; }

        [Display(Name = "الأهمية النسبية لكل معيار")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string CritereImportance { get; set; }

    }

}