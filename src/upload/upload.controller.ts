import { Controller, Post, UploadedFile, UseInterceptors  } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'

@Controller('upload')
export class UploadController {
  @Post('produto')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/produtos',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`
        cb(null, uniqueName)
      }
    })
  }))
  uploadProduto(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/produtos/${file.filename}` }
  }

  @Post('foto-perfil')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/fotos-perfil',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`
        cb(null, uniqueName)
      }
    })
  }))
  uploadFotoPerfil(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/fotos-perfil/${file.filename}` }
  }
}