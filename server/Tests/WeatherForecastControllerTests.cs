using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Server;
using Xunit;

namespace Tests
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public async Task GET_retrieves_weather_forecast()
        {
            // await using var application = new WebApplicationFactory<Startup>();
            // using var client = application.CreateClient();

            // var response = await client.GetAsync("/weatherforecast");
            // response.StatusCode.Should().Be(200);
        }
    }
}