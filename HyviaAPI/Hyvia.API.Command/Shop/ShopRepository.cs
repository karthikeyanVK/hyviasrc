using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hyvia.Data.Model;
using Hyvia.Mongo.DataAccess;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Collections.Generic;
using System;

namespace Hyvia.API.Command
{
    public class ShopRepository
    {
        public ShopRepository()
        {
            Mapper.CreateMap<ShopCommand, Shop>();
            try
            {
                BsonClassMap.RegisterClassMap<Shop>(cm =>
                {
                    cm.AutoMap();
                    cm.SetIdMember(cm.GetMemberMap(x => x.ShopId).SetIdGenerator(StringObjectIdGenerator.Instance));
                });
                 
            }
            catch //Should figureout to check already registered
            { }
        }
        public async Task<IList<Shop>> GetShops(Guid shopId)
        {
            SearchData searchData = null;
            IList<SearchData> searchDataList = new List<SearchData>();
            if (shopId != Guid.Empty)
            {
                searchData = new SearchData { SearchField = "ShopId" };
                searchData.SearchValue.Add(shopId.ToString());
            }
            searchDataList.Add(searchData);
            var result = await AccessDb.GetListWithFilter<Shop>(searchDataList, MongoTables.ShopTableName);
            return result;
        }

        public async Task<IList<Shop>> GetAllShops()
        {
            
            return await AccessDb.GetListOf<Shop>(MongoTables.ShopTableName);
        }
        public async Task<IList<Shop>> GetShopsByProduct(Guid productId)
        {
            ProductRepository productRepository = new ProductRepository();
            IList<SearchData> searchDataList = new List<SearchData>();
                       
            var products = await productRepository.GetProduct(productId);
            var shops = await AccessDb.GetListOf<Shop>(MongoTables.ShopTableName);

            var shopDetails = from shop in shops 
                              join product in products on shop.ShopId equals product.ShopId 
                              select new Shop {
                                  ShopId = shop.ShopId,
                                  Address = shop.Address,
                                  EmailAddress = shop.EmailAddress,
                                  Latitude = shop.Latitude,
                                  Longitude = shop.Longitude,
                                  Pincode = shop.Pincode,
                                  ShopName = shop.ShopName
                              };


            return shopDetails.ToList();

        }

        public async Task<Guid> Insertshop(ShopCommand shopCommand)
        {
            var shop =
                Mapper.Map<ShopCommand, Shop>(shopCommand);
            return await AccessDb.Save(shop, MongoTables.ShopTableName, MongoTables.ShopTablePrimaryKey);
        }
    }
}
