/**
 * Created by Dimi on 1/02/14.
 */
test("Right amount of planets", function() {
    equal(getPlanets().length, getTotalPlanets());
});