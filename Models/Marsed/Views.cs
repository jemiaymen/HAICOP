using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{
    public class BulletinView
	{
		[Required(ErrorMessage = "اجباري")]
		public int DossierID {get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 12)]
		public string Subject {get ; set;}

		#region acheteur

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "المشتري العمومي")]
        public int AcheteurID { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "الهاتف")]
		[DataType(DataType.PhoneNumber)]
		public string Tel {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "الفاكس")]
		[DataType(DataType.PhoneNumber)]
		public string Fax {get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم المسؤول عن خلية الصفقات العمومية و لقبه")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string FirstLastName {get ; set;}

		#endregion

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "طبيعة الصفقة")]
		public DossierType Type {get ; set;}

        [Display(Name = "صفقة مخصصة لفائدة المؤسسات الصغرى")]
		public bool IsSmall {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "المبلغ")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal TotalLocal {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "التمويل")]
		public Financement Financement { get ; set;}

		[Display(Name = "عدد الأقساط")]
		public int NbrLot { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "طريقة الإبرام")]
		public Method Method {get ; set;}

		#region fournisseur

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "صاحب الصفقة")]
        public int FournisseurID { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "جنسيته")]
        public string Nationalite { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "النشاط")]
        public string Activity { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "الإختصاص")]
        public string Speciality { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "الصنف")]
        public string Category { get ; set;}

		#endregion

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ الإعلان عن المنافسة")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateAnConc {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "آخر أجل لقبول العروض الفنية")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateLastChanceAcceptTechnique {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ فتح العروض الفنية")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateOpenAnTechnique {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ فتح العروض المالية")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateOpenAnFinance {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ تعهد لجنة الصفقات بالملف المالي")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateProFinance {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ تعهد لجنة الصفقات بالملف الفني")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateProTech {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ رأي لجنة الصفقات المالي")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateAvisFinance {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تاريخ رأي لجنة الصفقات الفني")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateAvisTech {get ; set;}

		[Display(Name = "تاريخ إبرام الصفقة")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateDebu {get ; set;}

		[Display(Name = "تاريخ بداية الإنجاز")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime DateTraveau {get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "آجال الإنجاز")]
		[StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string DelaiTraveau {get ; set;}


		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد ساحبي كراسات الشروط")]
        public int NbrChaier { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض")]
        public int NbrOffre { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض الملغات قبل الفرز المالي")]
        public int NbrSuppBeforeFinance { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض التي تم عرضها المالي")]
        public int NbrOffreFinance { get ; set;}


		#region normal

		[Display(Name = "معايير المطابقة")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string Critere {get ; set;}

		[Display(Name = "معايير المطابقة")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string Critere1 {get ; set;}

        [Display(Name = "عدد العروض المطابقة")]
        public int NbrConform { get ; set;}

		[Display(Name = "عدد العروض المطابقة")]
        public int NbrConform1 { get ; set;}

		[Display(Name = "المجموع")]
        public int TotalNbrConform { get ; set;}

		#endregion

		#region complex

		[Display(Name = "المعايير أو المقاييس المعتمدة للفرز")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string CritereComplex {get ; set;}

		[Display(Name = "المعايير أو المقاييس المعتمدة للفرز")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string CritereComplex1 {get ; set;}

		[Display(Name = "الأهمية النسبية لكل معيار")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string CritereImportance {get ; set;}

		[Display(Name = "الأهمية النسبية لكل معيار")]
		[StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
		public string CritereImportance1 {get ; set;}

		[Display(Name = "العدد الفني")]
        public int NbrTech { get ; set;}

		[Display(Name = "العدد المالي")]
        public int NbrFinance { get ; set;}

		[Display(Name = "المجموع")]
        public int TotalNbrComplex { get ; set;}

		#endregion

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الأسعار")]
        public NaturePrice NaturePrice { get ; set;}

		[Required(ErrorMessage = "اجباري")]
        [Display(Name = "صيغة الأسعار")]
        public MethodPrice MethodPrice { get ; set;}

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "تقديرات المشتري العمومي")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal TotalEstimation {get ; set;}

		#region estimation

		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "العرض الأول")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal Estimation {get ; set;}

		[Display(Name = "العرض الثاني")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal Estimation1 {get ; set;}

		[Display(Name = "العرض الثالث")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal Estimation2 {get ; set;}

		[Display(Name = "العرض الرابع")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal Estimation3 {get ; set;}

		[Display(Name = "العرض الخامس")]
		[DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
		public decimal Estimation4 {get ; set;}


		#endregion

        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
		public string Description {get ; set;}


		public void InitFromDoc(AchInDossier tmp)
		{
			DossierID = tmp.DossierID;
			Subject = tmp.Dossier.Subject;
			AcheteurID = tmp.AcheteurID;
			Type = tmp.Dossier.Type;

		}

	}

}