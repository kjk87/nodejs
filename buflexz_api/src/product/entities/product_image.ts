import { CoreEntity } from "../../common/core/CoreEntity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { ProductJoin } from "./product";

@Entity({
    name: 'product_image'
})
export class ProductImage extends CoreEntity {

    @PrimaryGeneratedColumn({type: 'int',  name: 'seq_no'})
    public seqNo: number;

    @Column({type: 'int',  name: 'product_seq_no'})
    public productSeqNo: number;

    @Column({type: 'varchar',  name: 'image'})
    public image: string;

    @Column({type: 'int',  name: 'array'})
    public array: number;

}

@Entity({
    name: 'product_image'
})
export class ProductImageJoin extends ProductImage {
    @ManyToOne(() => ProductJoin, product => product.imageList)
    @JoinColumn({name: 'product_seq_no', referencedColumnName: 'seqNo'})
    public product: ProductJoin;
}