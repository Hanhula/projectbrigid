import {
  createArticleEditorBackup,
  parseArticleEditorBackup,
} from "@/components/ui/ArticleEdit/EditComponents/article-edit-backup";

describe("article editor backups", () => {
  const item = {
    id: "item-1",
    title: "Moonblade",
    slug: "moonblade",
    entityClass: "Item",
    content: "A ceremonial blade.",
    mechanics: "Glows under moonlight.",
    type: { id: "weapon-id", title: "Weapon" },
    currentLocation: { id: "location-id", title: "Moon Temple" },
    updateDate: { date: "2026-08-15", timezone: "UTC", timezone_type: 0 },
  } as any;

  test("captures supported source fields and local draft edits", () => {
    const backup = createArticleEditorBackup({
      article: item,
      worldId: "world-1",
      editedFields: { mechanics: "Updated mechanics." },
    });

    expect(backup).toMatchObject({
      format: "brigids-anvil-article-backup",
      version: 1,
      worldId: "world-1",
      articleId: "item-1",
      entityClass: "Item",
      sourceUpdateDate: "2026-08-15",
      editedFields: { mechanics: "Updated mechanics." },
    });
    expect(backup.sourceFields).toMatchObject({
      content: "A ceremonial blade.",
      mechanics: "Glows under moonlight.",
      type: { id: "weapon-id" },
      currentLocation: { id: "location-id" },
    });
    expect(backup.sourceFields).not.toHaveProperty("title");
  });

  test("rejects an invalid backup", () => {
    expect(() => parseArticleEditorBackup({ format: "not-brigid" })).toThrow(
      "This backup format or version is not supported.",
    );
  });
});
