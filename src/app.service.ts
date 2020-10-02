import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const mockFilesRoot = 'data';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFileContent(fileName: string): string {
    return String(fs.readFileSync(`${mockFilesRoot}/${fileName}`));
  }
}
