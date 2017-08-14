using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{



	public class SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "المقرر")]
		public int ID {get ; set;}


		[Display(Name = "من")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? From { get ; set;}

		[Display(Name = "إلى")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime? To { get ; set;}
	}

	public class SearchStruct : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "اللجنة")]
		public int CommissionID {get ; set;}
	}


	public class SearchAcheteur : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "المشتري العمومي")]
		public int AcheteurID {get ; set;}
	}


	public class SearchFournisseur : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "صاحب الصفقة")]
		public int FournisseurID {get ; set;}
	}

	public class SearchFina : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "نوع التمويل")]
		public Financement Financement { get ; set;}
	}


	public class SearchForeign : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = " الممول")]
		public string Foreign { get ; set ;}
	}

	public class SearchTypeDoc : SearchRapp
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "طبيعة الملف")]
		public DossierType Type { get ; set ;}
	}

}