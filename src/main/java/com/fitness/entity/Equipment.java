package com.fitness.entity;

import java.util.Date;

/**
 * @author yao 2022/5/17
 * 健身器材类
 */
public class Equipment {
    int equipId;
    int type;
    String label;
    Date purchaseDate;
    int available;

    public int getEquipId() {
        return equipId;
    }

    public void setEquipId(int equipId) {
        this.equipId = equipId;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    @Override
    public String toString() {
        return "Equipment{" +
                "equipId=" + equipId +
                ", type=" + type +
                ", label='" + label + '\'' +
                ", purchaseDate=" + purchaseDate +
                ", available=" + available +
                '}';
    }
}
