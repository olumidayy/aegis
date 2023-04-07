import {
  Table, Column, Model, IsUUID, PrimaryKey,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'users',
})
export default class Users extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
    id: string;

  @Column
    user_account_number: string;

  @Column
    user_bank_code: string;

  @Column
    user_account_name: string;

  @Column
    is_verified: boolean;
}
