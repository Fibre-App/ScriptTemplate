import { Script, IScript, IResult, IRepository, IDiff } from "@fibre/types";

/*

This is a basic example script.

It doesn't matter what either the file name or the actual class name of a script are,
but ideally they should be the same as the name of the script.

Fibre will scan script projects and find classes which have the @script() decorator.
It is using this decorator that you can set a metadata for the script. These are the values
that will show in the Fibre user-interface.

The run method is what will be called by Fibre. You can have other methods or
functions in the file which you call from within the run method, but Fibre will
only call the run method.

The run method always needs to be written to take in an array of IRepositorys.
This is because the script might be used in the repository view, or in the open-
repository view where a script can be run on many repositories at once.

Because the run method needs to be take in an array, you should typically
iterate over each of the repositories in it, completing the same actions on
all of them.

*/

@Script({
  label: "Basic Example", // This shows on the button in the UI
  tooltip: "This is a basic example", // This shows in a tooltip of the button
  ionIcon: "checkboxOutline" // This is an icon for the button in the UI. Find them all at https://ionicons.com
})
export class BasicExample implements IScript {

  public async run(repositories: IRepository[]): Promise<IResult> {

    for (const repository of repositories) {

      // Here you can perform many actions on the repository object.

      await repository.createBranch("new branch name");
      await repository.commit("This is a commit message");
      await repository.push();

      /*

      You can also access many variables, but you should usually first call .load() to ensure they're
      up to date. You would also need to call .load() if you've made a change to the repository
      like commiting or pulling and you would like access to the new data.

      */

      await repository.load();

      // For example:

      // The first diff in the first file in the changeset (commit), where the first branch is currently at
      const diff: IDiff | undefined = repository.localbranches[0].changeset?.files[0].diffs[0];

      repository.changesets.filter(c => c.author === "John").forEach(c => {
        // Iterates over all changesets (commits) which were made by John
      });
    }

    /*

    You then need to return an IResult.
    Currently it only has a success flag.

    */

    return { success: true };
  }
}
