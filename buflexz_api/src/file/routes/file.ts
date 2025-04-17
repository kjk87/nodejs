import { Authorized, Body, BodyParam, CurrentUser, Get, Post, Put, Delete, QueryParam, QueryParams, Req, Res, Param, JsonController, UploadedFile } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import { Request, Response } from 'express';
import { Inject } from "typedi";
import { IOrder, IPaging, IJoin } from "../../common/core/CoreModel";
import { returnForm } from "../../common/services/util";
import { FileService } from "../service/file";


@JsonController('/file')
export class FileController extends CoreController {

    @Inject(()=> FileService)
    private fileService: FileService;

    constructor() {
        super();
    }

    @Post('/s3Upload')
    public async s3Upload(@Req() req: Request, @Res() res: Response, @UploadedFile('file') file: any) {
        return returnForm(await this.fileService.s3Upload(req, res, file));
    }
}