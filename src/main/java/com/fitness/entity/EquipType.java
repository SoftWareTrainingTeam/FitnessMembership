package com.fitness.entity;

/**
 * @author yao 2022/5/23
 */
public class EquipType {

    private int typeId;
    private String type;
    private double price;
    private String producer;
    private String productNumber;

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(String productNumber) {
        this.productNumber = productNumber;
    }

    @Override
    public String toString() {
        return "EquipType{" +
                "typeId=" + typeId +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", producer='" + producer + '\'' +
                ", productNumber='" + productNumber + '\'' +
                '}';
    }
}
