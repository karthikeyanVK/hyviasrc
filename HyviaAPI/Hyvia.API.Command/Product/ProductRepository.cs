﻿using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Hyvia.API.Query;
using Hyvia.Data.Model;
using Hyvia.Mongo.DataAccess;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using System;

namespace Hyvia.API.Command
{
    public class ProductRepository
    {
        public ProductRepository()
        {
            Mapper.CreateMap<ProductTypeCommand, ProductType>();
            Mapper.CreateMap<ProductCommand, Product>();
            try
            {
                BsonClassMap.RegisterClassMap<ProductType>(cm =>
                {
                    cm.AutoMap();
                    cm.SetIdMember(cm.GetMemberMap(x => x.ProductTypeId).SetIdGenerator(StringObjectIdGenerator.Instance));
                });
                BsonClassMap.RegisterClassMap<Product>(cm =>
                {
                    cm.AutoMap();
                    cm.SetIdMember(cm.GetMemberMap(x => x.ProductId).SetIdGenerator(StringObjectIdGenerator.Instance));
                });
            }
            catch //Should figureout to check already registered
            { }
        }
            
        public async Task<bool> InsertProduct(ProductCommand productCommand)
        {
            var product =
               Mapper.Map<ProductCommand, Product>(productCommand);
           
            // await AccessDb.Insert(product, MongoTables.ProductTableName);
            await AccessDb.Save(product, MongoTables.ProductTableName, MongoTables.ProductTablePrimaryKey);
            
            return true;
        }

        public async Task<bool> InsertProductType(ProductTypeCommand productTypeCommand)
        {
            var shop =
               Mapper.Map<ProductTypeCommand, ProductType>(productTypeCommand).ToBsonDocument();
            await AccessDb.Insert(shop, MongoTables.ProductTypeTableName);
            return true;
        }
        public async Task<IList<Product>> GetAllProducts()
        {

            return await AccessDb.GetListOf<Product>(MongoTables.ProductTableName);
        }
        public async Task<IList<Product>> GetProduct(Guid productId)
        {
            IList<SearchData> searchDataList = new List<SearchData>();
            SearchData searchData = null;
            if (productId != null && productId != Guid.Empty
                && !string.IsNullOrEmpty(productId.ToString()))
            {
                searchData = new SearchData
                {
                    SearchField = "ProductId",
                    SearchValue = new List<string> { productId.ToString() }
                };
                searchDataList.Add(searchData);
            }
           
            var result = await AccessDb.GetListWithFilter<Product>(searchDataList, MongoTables.ProductTableName);

            return result;
        }
        public async Task<IList<Product>> GetProduct(ProductQuery productQuery)
        {
            IList<SearchData> searchDataList = new List<SearchData>();
            SearchData searchData = null;
            if (!string.IsNullOrEmpty(productQuery.ProductName))
            {
                searchData = new SearchData
                {
                    SearchField = "ProductName",
                    SearchValue = new List<string> { productQuery.ProductName }
                };
                searchDataList.Add(searchData);
            }
            if (!string.IsNullOrEmpty(productQuery.ProductTypeId))
            {
                searchData = new SearchData
                {
                    SearchField = "ProductTypeId",
                    SearchValue = new List<string> { productQuery.ProductTypeId }
                };
                searchDataList.Add(searchData);
            }
            if (productQuery.ShopId != Guid.Empty)
            {
                searchData = new SearchData
                {
                    SearchField = "ShopId",
                    SearchValue = new List<string> { productQuery.ShopId.ToString() }
                };
                searchDataList.Add(searchData);
            }
            if (productQuery.ProductId != Guid.Empty)
            {
                searchData = new SearchData
                {
                    SearchField = "ProductId",
                    SearchValue = new List<string> { productQuery.ProductId.ToString() }
                };
                searchDataList.Add(searchData);
            }
            var result = await AccessDb.GetListWithFilter<Product>(searchDataList, MongoTables.ProductTableName);

            return result;
        }

        public async Task<IList<ProductType>> GetProductTypes()
        {
            /*SearchData searchData = null;
            if (!string.IsNullOrEmpty(productType))
            {
                searchData = new SearchData { SearchField = "ProductTypeName" };
                searchData.SearchValue.Add(productType);
            }*/
            var productTypes = await AccessDb.GetListOf<ProductType>(MongoTables.ProductTypeTableName);
            //var shop =
            //   Mapper.Map<IList<ProductTypeCommand>, IList<ProductType>>(productTypes);


            return productTypes;
        }

        public async Task<IList<ProductType>> GetProductTypes(string productType)
        {
            /*SearchData searchData = null;
            if (!string.IsNullOrEmpty(productType))
            {
                searchData = new SearchData { SearchField = "ProductTypeName" };
                searchData.SearchValue.Add(productType);
            }*/
            var productTypes = await AccessDb.GetListOf<ProductType>(MongoTables.ProductTypeTableName);
            //var shop =
            //   Mapper.Map<IList<ProductTypeCommand>, IList<ProductType>>(productTypes);
          
            
            return productTypes;
        }
    }

   
}
