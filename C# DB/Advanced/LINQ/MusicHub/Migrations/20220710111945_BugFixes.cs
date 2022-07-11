using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicHub.Migrations
{
    public partial class BugFixes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Album_Producer_ProducerId",
                table: "Album");

            migrationBuilder.DropForeignKey(
                name: "FK_Song_Album_AlbumId",
                table: "Song");

            migrationBuilder.DropForeignKey(
                name: "FK_Song_Writer_WriterId",
                table: "Song");

            migrationBuilder.DropForeignKey(
                name: "FK_SongPerformer_Performer_PerformerId",
                table: "SongPerformer");

            migrationBuilder.DropForeignKey(
                name: "FK_SongPerformer_Song_SongId",
                table: "SongPerformer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SongPerformer",
                table: "SongPerformer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Song",
                table: "Song");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Producer",
                table: "Producer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Performer",
                table: "Performer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Album",
                table: "Album");

            migrationBuilder.RenameTable(
                name: "SongPerformer",
                newName: "SongsPerformers");

            migrationBuilder.RenameTable(
                name: "Song",
                newName: "Songs");

            migrationBuilder.RenameTable(
                name: "Producer",
                newName: "Producers");

            migrationBuilder.RenameTable(
                name: "Performer",
                newName: "Performers");

            migrationBuilder.RenameTable(
                name: "Album",
                newName: "Albums");

            migrationBuilder.RenameIndex(
                name: "IX_SongPerformer_PerformerId",
                table: "SongsPerformers",
                newName: "IX_SongsPerformers_PerformerId");

            migrationBuilder.RenameIndex(
                name: "IX_Song_WriterId",
                table: "Songs",
                newName: "IX_Songs_WriterId");

            migrationBuilder.RenameIndex(
                name: "IX_Song_AlbumId",
                table: "Songs",
                newName: "IX_Songs_AlbumId");

            migrationBuilder.RenameIndex(
                name: "IX_Album_ProducerId",
                table: "Albums",
                newName: "IX_Albums_ProducerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SongsPerformers",
                table: "SongsPerformers",
                columns: new[] { "SongId", "PerformerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Songs",
                table: "Songs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Producers",
                table: "Producers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Performers",
                table: "Performers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Albums",
                table: "Albums",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Producers_ProducerId",
                table: "Albums",
                column: "ProducerId",
                principalTable: "Producers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Albums_AlbumId",
                table: "Songs",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Writer_WriterId",
                table: "Songs",
                column: "WriterId",
                principalTable: "Writer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongsPerformers_Performers_PerformerId",
                table: "SongsPerformers",
                column: "PerformerId",
                principalTable: "Performers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongsPerformers_Songs_SongId",
                table: "SongsPerformers",
                column: "SongId",
                principalTable: "Songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Producers_ProducerId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Albums_AlbumId",
                table: "Songs");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Writer_WriterId",
                table: "Songs");

            migrationBuilder.DropForeignKey(
                name: "FK_SongsPerformers_Performers_PerformerId",
                table: "SongsPerformers");

            migrationBuilder.DropForeignKey(
                name: "FK_SongsPerformers_Songs_SongId",
                table: "SongsPerformers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SongsPerformers",
                table: "SongsPerformers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Songs",
                table: "Songs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Producers",
                table: "Producers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Performers",
                table: "Performers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Albums",
                table: "Albums");

            migrationBuilder.RenameTable(
                name: "SongsPerformers",
                newName: "SongPerformer");

            migrationBuilder.RenameTable(
                name: "Songs",
                newName: "Song");

            migrationBuilder.RenameTable(
                name: "Producers",
                newName: "Producer");

            migrationBuilder.RenameTable(
                name: "Performers",
                newName: "Performer");

            migrationBuilder.RenameTable(
                name: "Albums",
                newName: "Album");

            migrationBuilder.RenameIndex(
                name: "IX_SongsPerformers_PerformerId",
                table: "SongPerformer",
                newName: "IX_SongPerformer_PerformerId");

            migrationBuilder.RenameIndex(
                name: "IX_Songs_WriterId",
                table: "Song",
                newName: "IX_Song_WriterId");

            migrationBuilder.RenameIndex(
                name: "IX_Songs_AlbumId",
                table: "Song",
                newName: "IX_Song_AlbumId");

            migrationBuilder.RenameIndex(
                name: "IX_Albums_ProducerId",
                table: "Album",
                newName: "IX_Album_ProducerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SongPerformer",
                table: "SongPerformer",
                columns: new[] { "SongId", "PerformerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Song",
                table: "Song",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Producer",
                table: "Producer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Performer",
                table: "Performer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Album",
                table: "Album",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Album_Producer_ProducerId",
                table: "Album",
                column: "ProducerId",
                principalTable: "Producer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Song_Album_AlbumId",
                table: "Song",
                column: "AlbumId",
                principalTable: "Album",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Song_Writer_WriterId",
                table: "Song",
                column: "WriterId",
                principalTable: "Writer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongPerformer_Performer_PerformerId",
                table: "SongPerformer",
                column: "PerformerId",
                principalTable: "Performer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongPerformer_Song_SongId",
                table: "SongPerformer",
                column: "SongId",
                principalTable: "Song",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
