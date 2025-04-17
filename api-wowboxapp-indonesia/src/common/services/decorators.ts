import * as Validator from "class-validator";
import { ValidationOptions as OldValidationOptions, IsNumberOptions } from "class-validator";
import { Request } from 'express';
import { QueryRunner } from "typeorm";
import { BUFLEXZ_DATASOURCE, BUFLEXZ_RP_DATASOURCE } from "../../DataSourceManager";
import { CoreError } from "../core/CoreError";
import { E_INTERNAL_SERVER, E_NOTPERMISSION } from "./errorType";


export interface ValidationOptions extends OldValidationOptions {
    name?: string
}


export function convertMessage(validationOptions: ValidationOptions, message?: string | ((value?: any, constraint1?: any, constraint2?: any) => string)): ValidationOptions {
    validationOptions = validationOptions || {};
    // if(validationOptions['name'] && typeof message == 'string') {
    //     message = message.replace('$property', validationOptions['name']);
    // }
    if(!validationOptions.message) {
        validationOptions.message = message;
    };

    return validationOptions
}

export function IsNotEmpty(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    validationOptions = convertMessage(validationOptions);

    return Validator.IsNotEmpty(validationOptions);
};

export function IsNumber(options?: IsNumberOptions, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    //validationOptions = convertMessage(validationOptions, '$property 항목은 숫자만 입력할 수 있습니다.');

    return Validator.IsNumber(options, validationOptions);
};


export function Min(min: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    //validationOptions = convertMessage(validationOptions, '$property 항목은 최소 $constraint1 여야 합니다.');

    return Validator.Min(min, validationOptions);
}


export function Max(max: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    //validationOptions = convertMessage(validationOptions, '$property 항목은 최소 $constraint1 여야 합니다.');

    return Validator.Max(max, validationOptions);
}


export function MinLength(min: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    //validationOptions = convertMessage(validationOptions, '$property 항목은 최소 $constraint1 길이여야 합니다.');

    return Validator.MinLength(min, validationOptions);
};


export function MaxLength(max: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    //validationOptions = convertMessage(validationOptions, '$property 항목은 최대 $constraint1 길이까지 허용됩니다.');

    return Validator.MaxLength(max, validationOptions);
};


export function Length(min: number, max?: number, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {

    // validationOptions = convertMessage(validationOptions, 
    //     function (args) {
    //         var isMinLength = args.constraints[0] !== null && args.constraints[0] !== undefined;
    //         var isMaxLength = args.constraints[1] !== null && args.constraints[1] !== undefined;
    //         if (isMinLength && (!args.value || args.value.length < args.constraints[0])) {
    //             return "$property 항목은 $constraint1 길이보다 길거나 같아야 합니다.";
    //         }
    //         else if (isMaxLength && (args.value.length > args.constraints[1])) {
    //             return "$property 항목은 $constraint2 길이보다 짧거나 같아야 합니다.";
    //         }
    //         return "$property 항목은 $constraint1 길이보다 길거나 같고 $constraint2 길이보다 짧거나 같아야 합니다.";
    //     });

    return Validator.Length(min, max, validationOptions);
};


export function Equals(comparison: any, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    //validationOptions = convertMessage(validationOptions, "$property 항목은 $constraint1 값과 일치해야합니다.");

    return Validator.Equals(comparison, validationOptions);
};


export function NotEquals(comparison: any, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    //validationOptions = convertMessage(validationOptions, "$property 항목은 $constraint1 값이 허용되지 않습니다.");

    return Validator.NotEquals(comparison, validationOptions);
};


 export function ArrayNotEmpty(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void {
    //validationOptions = convertMessage(validationOptions, `$property 항목은 필수입니다.`);

    return Validator.ArrayNotEmpty(validationOptions);
};

export function Transaction(trxOption?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE') {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        let originMethod = descriptor.value;
        descriptor.value = async function (req) {
            let queryRunner: QueryRunner = BUFLEXZ_DATASOURCE.createQueryRunner();
            await queryRunner.startTransaction(trxOption);
            req.queryRunner = queryRunner;
            let args = [...arguments, ...[req.queryRunner.manager]];
            try {
                let result = await originMethod.apply(this, args);
                if(result) {
                    await req.queryRunner.commitTransaction();
                    return result;
                }
            } catch(e) {
                await req.queryRunner.rollbackTransaction();
                if(e instanceof CoreError){
                    throw e;
                }
                throw new CoreError(E_INTERNAL_SERVER, e.message);
            } finally {
                await req.queryRunner.release();
            }
        }
    }
}

export function CheckApiKey(){
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let originMethod = descriptor.value;
        descriptor.value = async function (req) {
            let apiKey = req.headers.api_key;
            if(process.env.API_KEY != apiKey){
                throw new CoreError(E_NOTPERMISSION, 'invaild api key');
            }
            let args = [...arguments];
            let result = await originMethod.apply(this, args);
            return result;
        }
    }
}