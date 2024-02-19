import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class File extends Base {
   @Column()
    name: string;

    @Column()
    extension: string;

    @Column()
    mime_type: string;

    @Column()
    size: number;
}
