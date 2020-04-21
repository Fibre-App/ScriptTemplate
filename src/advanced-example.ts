import { Script, IScript, IResult, IRepository, ILogger, IFileService,
  IToasterService, IDialogService, YesNoResult, WriteType, Inject, A } from "@fibre/types";

/*

This is a more advanced example script which uses dependancies.

Provided by the @fibre/types project are handful of dependancies which can be
used within scripts. This script is using all 4 of the ones which are currently
available, but you can use any subselection of them.

Using the dependancies provided by Fibre means that scripts can remain easy to
unit test.

*/

@Script("advancedExample")
export class AdvancedExample implements IScript {

  constructor(@Inject(A.Logger) private readonly logger: ILogger,
              @Inject(A.FileService) private readonly fileService: IFileService,
              @Inject(A.ToasterService) private readonly toasterService: IToasterService,
              @Inject(A.DialogService) private readonly dialogService: IDialogService) { }

  public async run(repositories: IRepository[]): Promise<IResult> {

    for (const repository of repositories) {

      this.logger.info("Running the script: advancedExample");

      const shouldContinue: YesNoResult = await this.dialogService.showYesNoDialog("Sure?", "Do you want to continue?", YesNoResult.Yes);

      if (shouldContinue) {
        await this.fileService.writeFile("file/path.txt", repository.name, WriteType.append);

        this.toasterService.success("Written!", "Successfully written to file");
      }
    }

    return { success: true };
  }
}
