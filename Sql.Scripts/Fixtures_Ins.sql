
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Fixtures_Ins]
( 
	@Fixtures dbo.FixturesType readonly, 
	@year int 
)
-- =============================================
-- Author:		Sergiy Andronov
-- Create date: Sep 02, 2014
-- Description:	Data Import - merges data into the dbo.Fixtures table. 
-- Parameters:  @Fixtures - an instance of dbo.FixturesType table; 
--				@year - the season year. 
-- =============================================
as
begin

	insert into dbo.Fixtures( Country, Div, [Year], [Date], HomeTeam, AwayTeam )
	select distinct Country, Div, [Year], [Date], HomeTeam, AwayTeam 
	from @Fixtures 
	where [Year] = @year  

end;

GO


