using System;

namespace Hyvia.API.Command
{
    public class ShopCommand
    {
        //private Guid shopId;
        //public Guid ShopId
        //{
        //    get
        //    {
        //        if (shopId == Guid.Empty)
        //         shopId = Guid.NewGuid();
        //        return shopId;
        //    }
        //    set
        //    {
        //        if (value == Guid.Empty)
        //           value = Guid.NewGuid();
        //        shopId = value;
        //    }
        //}
        public string ShopId { get; set; }
        public string ShopName { get; set; }
        public string EmailAddress { get; set; }
        public string Pincode { get; set; }
        public string Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int ActivationStatus { get; set; }

        public string ShopPhoneNo { get; set; }
        public string ShopMobileNo { get; set; }
        public string ShopOwnerPhoneNo { get; set; }
        public string ShopOwnerMobileNo { get; set; }

        public string ShopCategory { get; set; }
        public string ShopWebsiteURL { get; set; }
        public DateTime RegistrationDate { get; set; }

    }
}
